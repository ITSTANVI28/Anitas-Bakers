<?php
verifyJWT();

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM promos ORDER BY id DESC");
    $promos = $stmt->fetchAll();
    
    $formattedPromos = [];
    foreach ($promos as $p) {
        $formattedPromos[] = [
            'id' => (int)$p['id'],
            'code' => $p['code'],
            'discount' => (int)$p['discount'],
            'active' => (bool)$p['active']
        ];
    }
    
    successResponse($formattedPromos);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
