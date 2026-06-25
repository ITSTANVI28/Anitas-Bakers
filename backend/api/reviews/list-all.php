<?php
verifyJWT();

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM reviews ORDER BY id DESC");
    $reviews = $stmt->fetchAll();
    
    $formattedReviews = [];
    foreach ($reviews as $r) {
        $formattedReviews[] = [
            'id' => (int)$r['id'],
            'author' => $r['author'],
            'type' => $r['type'],
            'stars' => (int)$r['stars'],
            'text' => $r['text'],
            'approved' => (bool)$r['approved']
        ];
    }
    
    successResponse($formattedReviews);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
