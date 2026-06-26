<?php
if (!isset($refId)) {
    errorResponse('Reference ID is required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->prepare("SELECT * FROM orders WHERE ref_id = ?");
    $stmt->execute([$refId]);
    $o = $stmt->fetch();
    
    if (!$o) {
        errorResponse('Order not found', 404);
    }
    
    $formattedOrder = [
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
        'total' => (float)$o['grand_total'],
        'status' => $o['status']
    ];
    
    successResponse($formattedOrder);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
