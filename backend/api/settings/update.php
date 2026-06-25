<?php
verifyJWT();

$body = getRequestBody();
$whatsApp = $body['whatsApp'] ?? $body['whatsApp'] ?? '';
$deliveryFee = isset($body['deliveryFee']) ? (float)$body['deliveryFee'] : -1;
$address = $body['address'] ?? '';
$hours = $body['hours'] ?? '';
$showAnnouncement = isset($body['showAnnouncement']) ? (int)$body['showAnnouncement'] : -1;
$announcementText = $body['announcementText'] ?? '';
$passcode = $body['passcode'] ?? '';

try {
    $db = Database::getInstance()->getConnection();
    
    $fields = [];
    $params = [];
    
    if (!empty($whatsApp)) {
        $fields[] = "whatsapp = ?";
        $params[] = $whatsApp;
    }
    
    if ($deliveryFee >= 0) {
        $fields[] = "delivery_fee = ?";
        $params[] = $deliveryFee;
    }
    
    if (!empty($address)) {
        $fields[] = "address = ?";
        $params[] = $address;
    }
    
    if (!empty($hours)) {
        $fields[] = "hours = ?";
        $params[] = $hours;
    }
    
    if ($showAnnouncement !== -1) {
        $fields[] = "show_announcement = ?";
        $params[] = $showAnnouncement;
    }
    
    if (!empty($announcementText)) {
        $fields[] = "announcement_text = ?";
        $params[] = $announcementText;
    }
    
    if (!empty($passcode)) {
        $hash = password_hash($passcode, PASSWORD_DEFAULT);
        $fields[] = "passcode_hash = ?";
        $params[] = $hash;
    }
    
    if (empty($fields)) {
        errorResponse('No fields provided to update', 400);
    }
    
    $sql = "UPDATE settings SET " . implode(", ", $fields) . " WHERE id = 1";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    successResponse(null, 'Settings updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
