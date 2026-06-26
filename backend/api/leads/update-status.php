<?php
verifyJWT();

if (!isset($leadId)) {
    errorResponse('Lead ID is required', 400);
}

$body = getRequestBody();
$status = trim($body['status'] ?? '');

$validStatuses = ['Pending', 'Contacted'];
if (!in_array($status, $validStatuses)) {
    errorResponse('Invalid status. Must be one of: ' . implode(', ', $validStatuses), 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE leads SET status = ? WHERE id = ?");
    $stmt->execute([$status, $leadId]);
    
    successResponse(null, 'Lead status updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
