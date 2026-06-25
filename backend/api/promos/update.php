<?php
verifyJWT();

if (!isset($promoId)) {
    errorResponse('Promo ID is required', 400);
}

$body = getRequestBody();
$code = trim($body['code'] ?? '');
$discount = isset($body['discount']) ? (int)$body['discount'] : -1;
$active = isset($body['active']) ? (int)$body['active'] : -1;

try {
    $db = Database::getInstance()->getConnection();
    
    // Build dynamic UPDATE query
    $fields = [];
    $params = [];
    
    if (!empty($code)) {
        // Ensure no duplicate code on other promos
        $stmt = $db->prepare("SELECT COUNT(*) FROM promos WHERE code = ? AND id != ?");
        $stmt->execute([$code, $promoId]);
        if ($stmt->fetchColumn() > 0) {
            errorResponse('Promo code already exists on another promo', 400);
        }
        $fields[] = "code = ?";
        $params[] = $code;
    }
    
    if ($discount >= 0) {
        if ($discount > 100) {
            errorResponse('Discount must be between 0 and 100', 400);
        }
        $fields[] = "discount = ?";
        $params[] = $discount;
    }
    
    if ($active !== -1) {
        $fields[] = "active = ?";
        $params[] = $active;
    }
    
    if (empty($fields)) {
        errorResponse('No fields provided to update', 400);
    }
    
    $params[] = $promoId;
    $sql = "UPDATE promos SET " . implode(", ", $fields) . " WHERE id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    successResponse(null, 'Promo updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
