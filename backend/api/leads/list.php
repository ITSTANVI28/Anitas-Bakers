<?php
verifyJWT();

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM leads ORDER BY id DESC");
    $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $formattedLeads = [];
    foreach ($leads as $lead) {
        $formattedLeads[] = [
            'id' => (int)$lead['id'],
            'name' => $lead['name'],
            'phone' => $lead['phone'],
            'interest' => $lead['interest'],
            'status' => $lead['status'],
            'createdAt' => $lead['created_at']
        ];
    }
    
    successResponse($formattedLeads, 'Leads retrieved successfully');
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
