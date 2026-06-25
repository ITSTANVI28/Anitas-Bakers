<?php
$body = getRequestBody();
$date = $body['date'] ?? date('Y-m-d');
$name = trim($body['name'] ?? '');
$phone = trim($body['phone'] ?? '');
$tiers = trim($body['tiers'] ?? '');
$shape = trim($body['shape'] ?? '');
$desc = trim($body['desc'] ?? '');     // Map frontend desc -> description
$image = trim($body['image'] ?? '');   // Map frontend image -> image_url

if (empty($name) || empty($phone)) {
    errorResponse('Name and phone number are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("INSERT INTO inquiries (date, name, phone, tiers, shape, description, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending')");
    $stmt->execute([$date, $name, $phone, $tiers, $shape, $desc, $image]);
    
    $newId = $db->lastInsertId();
    successResponse(['id' => (int)$newId], 'Inquiry submitted successfully', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
