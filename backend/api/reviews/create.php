<?php
$body = getRequestBody();
$author = trim($body['author'] ?? '');
$type = trim($body['type'] ?? 'Customer');
$stars = isset($body['stars']) ? (int)$body['stars'] : 5;
$text = trim($body['text'] ?? '');

if (empty($author) || empty($text) || $stars < 1 || $stars > 5) {
    errorResponse('Author, text, and valid star rating (1-5) are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("INSERT INTO reviews (author, type, stars, text, approved) VALUES (?, ?, ?, ?, 0)");
    $stmt->execute([$author, $type, $stars, $text]);
    
    $newId = $db->lastInsertId();
    successResponse(['id' => (int)$newId], 'Review submitted for approval', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
