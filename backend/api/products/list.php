<?php
$category = $_GET['category'] ?? null;

try {
    $db = Database::getInstance()->getConnection();
    
    if ($category) {
        $stmt = $db->prepare("SELECT * FROM products WHERE category = ? ORDER BY id DESC");
        $stmt->execute([$category]);
    } else {
        $stmt = $db->query("SELECT * FROM products ORDER BY id DESC");
    }
    
    $products = $stmt->fetchAll();
    
    // Map database fields to frontend fields
    // DB: is_customisable -> TINYINT, in_stock -> TINYINT
    // Frontend expects: isCustomisable -> boolean, inStock -> boolean
    $formattedProducts = [];
    foreach ($products as $p) {
        $formattedProducts[] = [
            'id' => (int)$p['id'],
            'name' => $p['name'],
            'category' => $p['category'],
            'price' => (float)$p['price'],
            'desc' => $p['description'], // Frontend expects desc, DB is description
            'image' => $p['image_url'],  // Frontend expects image, DB is image_url
            'isCustomisable' => (bool)$p['is_customisable'],
            'inStock' => (bool)$p['in_stock']
        ];
    }
    
    successResponse($formattedProducts);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
