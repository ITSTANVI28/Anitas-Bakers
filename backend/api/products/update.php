<?php
verifyJWT();

if (!isset($productId)) {
    errorResponse('Product ID is required', 400);
}

$body = getRequestBody();
$name = $body['name'] ?? '';
$category = $body['category'] ?? '';
$price = $body['price'] ?? 0.0;
$desc = $body['desc'] ?? '';       // Map frontend desc to description
$image = $body['image'] ?? '';     // Map frontend image to image_url
$isCustomisable = isset($body['isCustomisable']) ? (int)$body['isCustomisable'] : 0;
$inStock = isset($body['inStock']) ? (int)$body['inStock'] : 1;

if (empty($name) || empty($category) || $price <= 0) {
    errorResponse('Name, category, and positive price are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("UPDATE products SET name = ?, category = ?, price = ?, `desc` = ?, image = ?, isCustomisable = ?, inStock = ? WHERE id = ?");
    $stmt->execute([$name, $category, $price, $desc, $image, $isCustomisable, $inStock, $productId]);
    
    successResponse(null, 'Product updated successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
