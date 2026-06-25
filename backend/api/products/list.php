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
    $formattedProducts = [];
    foreach ($products as $p) {
        $formattedProducts[] = [
            'id' => (int)$p['id'],
            'name' => $p['name'],
            'category' => $p['category'],
            'price' => (float)$p['price'],
            'desc' => $p['desc'],
            'image' => $p['image'],
            'isCustomisable' => (bool)$p['isCustomisable'],
            'inStock' => (bool)$p['inStock']
        ];
    }
    
    successResponse($formattedProducts);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
