<?php
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRESERVE_ZERO_FRACTION);
    exit;
}

function successResponse($data = null, $message = 'Success', $statusCode = 200) {
    jsonResponse(['success' => true, 'message' => $message, 'data' => $data], $statusCode);
}

function errorResponse($message = 'Error', $statusCode = 400) {
    jsonResponse(['success' => false, 'message' => $message, 'data' => null], $statusCode);
}

function getRequestBody() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}
