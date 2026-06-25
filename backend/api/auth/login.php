<?php
$body = getRequestBody();
$passcode = $body['passcode'] ?? '';

if (empty($passcode)) {
    errorResponse('Passcode is required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT passcode_hash FROM settings WHERE id = 1");
    $settings = $stmt->fetch();
    
    if (!$settings) {
        errorResponse('System settings not initialized', 500);
    }
    
    if (password_verify($passcode, $settings['passcode_hash'])) {
        $token = generateJWT(['role' => 'admin', 'username' => 'admin']);
        successResponse(['token' => $token], 'Login successful');
    } else {
        errorResponse('Invalid passcode', 401);
    }
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
