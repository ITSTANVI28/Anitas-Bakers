<?php
verifyJWT();

if (!isset($promoId)) {
    errorResponse('Promo ID is required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("DELETE FROM promos WHERE id = ?");
    $stmt->execute([$promoId]);
    
    successResponse(null, 'Promo deleted successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
