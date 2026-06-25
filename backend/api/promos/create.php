<?php
verifyJWT();

$body = getRequestBody();
$code = trim($body['code'] ?? '');
$discount = isset($body['discount']) ? (int)$body['discount'] : 0;
$active = isset($body['active']) ? (int)$body['active'] : 1;

if (empty($code) || $discount <= 0 || $discount > 100) {
    errorResponse('Code is required, and discount must be between 1 and 100', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    
    // Check if code already exists
    $stmt = $db->prepare("SELECT COUNT(*) FROM promos WHERE code = ?");
    $stmt->execute([$code]);
    if ($stmt->fetchColumn() > 0) {
        errorResponse('Promo code already exists', 400);
    }
    
    $stmt = $db->prepare("INSERT INTO promos (code, discount, active) VALUES (?, ?, ?)");
    $stmt->execute([$code, $discount, $active]);
    
    $newId = $db->lastInsertId();
    successResponse(['id' => (int)$newId], 'Promo code created', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
