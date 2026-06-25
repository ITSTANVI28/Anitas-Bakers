<?php
verifyJWT();

if (!isset($orderId)) {
    errorResponse('Order ID is required', 400);
}

$body = getRequestBody();
$status = $body['status'] ?? '';

$validStatuses = ['Placed', 'Baking', 'Decorating', 'Shipped', 'Delivered'];
if (!in_array($status, $validStatuses)) {
    errorResponse('Invalid status value. Must be one of: ' . implode(', ', $validStatuses), 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE orders SET status = ? WHERE id = ?");
    $stmt->execute([$status, $orderId]);
    
    successResponse(null, 'Order status updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
