<?php
verifyJWT();

if (!isset($inquiryId)) {
    errorResponse('Inquiry ID is required', 400);
}

$body = getRequestBody();
$status = $body['status'] ?? '';

$validStatuses = ['Pending', 'Accepted', 'Completed', 'Rejected'];
if (!in_array($status, $validStatuses)) {
    errorResponse('Invalid status. Must be one of: ' . implode(', ', $validStatuses), 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE inquiries SET status = ? WHERE id = ?");
    $stmt->execute([$status, $inquiryId]);
    
    successResponse(null, 'Inquiry status updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
