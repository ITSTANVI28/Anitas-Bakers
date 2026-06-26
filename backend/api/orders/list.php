<?php
verifyJWT();

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM orders ORDER BY date DESC");
    $orders = $stmt->fetchAll();
    
    $formattedOrders = [];
    foreach ($orders as $o) {
        $formattedOrders[] = [
            'id' => (int)$o['id'],
            'refId' => $o['ref_id'],
            'date' => $o['date'],
            'custName' => $o['cust_name'],
            'custPhone' => $o['cust_phone'],
            'custAddress' => $o['cust_address'],
            'deliveryDate' => $o['delivery_date'],
            'deliveryTime' => $o['delivery_time'],
            'notes' => $o['notes'],
            'items' => json_decode($o['items'], true) ?? [],
            'subtotal' => (float)$o['subtotal'],
            'discount' => (float)$o['discount'],
            'deliveryFee' => (float)$o['delivery_fee'],
            'tax' => (float)$o['tax'],
            'total' => (float)$o['grand_total'], // Map grand_total -> total
            'status' => $o['status']
        ];
    }
    
    successResponse($formattedOrders);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
