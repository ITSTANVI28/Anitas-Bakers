<?php
verifyJWT();

if (!isset($leadId)) {
    errorResponse('Lead ID is required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("DELETE FROM leads WHERE id = ?");
    $stmt->execute([$leadId]);
    
    successResponse(null, 'Lead deleted successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
