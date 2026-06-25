<?php
verifyJWT();

$body = getRequestBody();
$name = $body['name'] ?? '';
$category = $body['category'] ?? '';
$price = $body['price'] ?? 0.0;
$desc = $body['desc'] ?? '';       // Frontend sends desc, map to DB description
$image = $body['image'] ?? '';     // Frontend sends image, map to DB image_url
$isCustomisable = isset($body['isCustomisable']) ? (int)$body['isCustomisable'] : 0;
$inStock = isset($body['inStock']) ? (int)$body['inStock'] : 1;

if (empty($name) || empty($category) || $price <= 0) {
    errorResponse('Name, category, and positive price are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("INSERT INTO products (name, category, price, `desc`, image, isCustomisable, inStock) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$name, $category, $price, $desc, $image, $isCustomisable, $inStock]);
    
    $newId = $db->lastInsertId();
    successResponse(['id' => (int)$newId], 'Product created', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
