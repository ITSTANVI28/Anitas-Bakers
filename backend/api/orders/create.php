<?php
$body = getRequestBody();
$custName = $body['cust_name'] ?? $body['custName'] ?? '';
$custPhone = $body['cust_phone'] ?? $body['custPhone'] ?? '';
$custAddress = $body['cust_address'] ?? $body['custAddress'] ?? '';
$deliveryDate = $body['delivery_date'] ?? $body['deliveryDate'] ?? null;
$deliveryTime = $body['delivery_time'] ?? $body['deliveryTime'] ?? '';
$notes = $body['notes'] ?? '';
$items = $body['items'] ?? [];
$subtotal = $body['subtotal'] ?? 0.0;
$discount = $body['discount'] ?? 0.0;
$deliveryFee = $body['delivery_fee'] ?? $body['deliveryFee'] ?? 0.0;
$tax = $body['tax'] ?? 0.0;
$grandTotal = $body['grand_total'] ?? $body['grandTotal'] ?? 0.0;

if (empty($custName) || empty($custPhone) || empty($items)) {
    errorResponse('Customer name, phone number, and items are required', 400);
}

try {
    $db = Database::getInstance()->getConnection();
    
    // Generate unique ref_id
    $refId = '';
    do {
        $randNum = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);
        $refId = 'ANITA-' . $randNum;
        
        // Check uniqueness
        $stmt = $db->prepare("SELECT COUNT(*) FROM orders WHERE ref_id = ?");
        $stmt->execute([$refId]);
        $exists = $stmt->fetchColumn() > 0;
    } while ($exists);
    
    $stmt = $db->prepare("INSERT INTO orders (ref_id, cust_name, cust_phone, cust_address, delivery_date, delivery_time, notes, items, subtotal, discount, delivery_fee, tax, grand_total, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Placed')");
    
    $itemsJson = json_encode($items);
    $stmt->execute([
        $refId,
        $custName,
        $custPhone,
        $custAddress,
        $deliveryDate,
        $deliveryTime,
        $notes,
        $itemsJson,
        $subtotal,
        $discount,
        $deliveryFee,
        $tax,
        $grandTotal
    ]);
    
    successResponse(['ref_id' => $refId], 'Order placed successfully', 201);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
