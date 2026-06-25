<?php
verifyJWT();

if (!isset($productId)) {
    errorResponse('Product ID is required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("DELETE FROM products WHERE id = ?");
    $stmt->execute([$productId]);
    
    successResponse(null, 'Product deleted successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
