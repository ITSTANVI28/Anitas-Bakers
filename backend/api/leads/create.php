<?php
$body = getRequestBody();
$name = trim($body['name'] ?? '');
$phone = trim($body['phone'] ?? '');
$interest = trim($body['interest'] ?? 'Just Browsing');

if (empty($name) || empty($phone)) {
    errorResponse('Name and phone number are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("INSERT INTO leads (name, phone, interest, status) VALUES (?, ?, ?, 'Pending')");
    $stmt->execute([$name, $phone, $interest]);
    
    $newId = $db->lastInsertId();
    successResponse(['id' => (int)$newId], 'Visitor details saved successfully', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
