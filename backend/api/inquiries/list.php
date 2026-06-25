<?php
verifyJWT();

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM inquiries ORDER BY id DESC");
    $inquiries = $stmt->fetchAll();
    
    $formattedInquiries = [];
    foreach ($inquiries as $i) {
        $formattedInquiries[] = [
            'id' => (int)$i['id'],
            'date' => $i['date'],
            'name' => $i['name'],
            'phone' => $i['phone'],
            'tiers' => $i['tiers'],
            'shape' => $i['shape'],
            'desc' => $i['description'], // Map description -> desc
            'image' => $i['image_url'],   // Map image_url -> image
            'status' => $i['status']
        ];
    }
    
    successResponse($formattedInquiries);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
