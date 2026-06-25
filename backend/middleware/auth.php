<?php
define('JWT_SECRET', 'anitas_bakers_super_secret_key_2026_change_this');

function generateJWT($payload) {
    $header = rtrim(strtr(base64_encode(json_encode(['alg' => 'HS256', 'typ' => 'JWT'])), '+/', '-_'), '=');
    $payload['iat'] = time();
    $payload['exp'] = time() + (24 * 60 * 60); // 24 hours
    $payload = rtrim(strtr(base64_encode(json_encode($payload)), '+/', '-_'), '=');
    $signature = rtrim(strtr(base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true)), '+/', '-_'), '=');
    return "$header.$payload.$signature";
}

function verifyJWT() {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (empty($authHeader) || !str_starts_with($authHeader, 'Bearer ')) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized: No token provided']);
        exit;
    }

    $token = substr($authHeader, 7);
    $parts = explode('.', $token);
    if (count($parts) !== 3) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid token']);
        exit;
    }

    [$header, $payload, $signature] = $parts;
    
    // Recalculate signature
    $validSignature = rtrim(strtr(base64_encode(hash_hmac('sha256', "$header.$payload", JWT_SECRET, true)), '+/', '-_'), '=');

    if (!hash_equals($validSignature, $signature)) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized: Invalid token signature']);
        exit;
    }

    $data = json_decode(base64_decode(strtr($payload, '-_', '+/')), true);
    if (isset($data['exp']) && $data['exp'] < time()) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized: Token expired']);
        exit;
    }

    return $data;
}
