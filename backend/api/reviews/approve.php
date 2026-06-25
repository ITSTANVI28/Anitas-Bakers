<?php
verifyJWT();

if (!isset($reviewId)) {
    errorResponse('Review ID is required', 400);
}

$body = getRequestBody();
$approved = isset($body['approved']) ? (int)$body['approved'] : 1;

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE reviews SET approved = ? WHERE id = ?");
    $stmt->execute([$approved, $reviewId]);
    
    successResponse(null, 'Review status updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
