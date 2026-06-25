<?php
try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM settings WHERE id = 1");
    $settings = $stmt->fetch();
    
    if (!$settings) {
        errorResponse('Settings not initialized', 500);
    }
    
    $formattedSettings = [
        'whatsApp' => $settings['whatsapp'],
        'deliveryFee' => (float)$settings['delivery_fee'],
        'address' => $settings['address'],
        'hours' => $settings['hours'],
        'showAnnouncement' => (bool)$settings['show_announcement'],
        'announcementText' => $settings['announcement_text'],
        'heroTitle' => $settings['hero_title'],
        'heroSubtitle' => $settings['hero_subtitle'],
        'heroDesc' => $settings['hero_desc'],
        'aboutTitle' => $settings['about_title'],
        'aboutDesc' => $settings['about_desc'],
        'footerAbout' => $settings['footer_about'],
        'facebookUrl' => $settings['facebook_url'],
        'instagramUrl' => $settings['instagram_url'],
        'themeColor' => $settings['theme_color']
    ];
    
    successResponse($formattedSettings);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
