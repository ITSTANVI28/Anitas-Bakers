<?php
require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    $hash = password_hash("1234", PASSWORD_DEFAULT);
    
    // Check if settings row exists
    $stmt = $db->query("SELECT COUNT(*) FROM settings WHERE id = 1");
    $exists = $stmt->fetchColumn() > 0;
    
    if ($exists) {
        $db->prepare("UPDATE settings SET passcode_hash = ? WHERE id = 1")->execute([$hash]);
    } else {
        $db->prepare("INSERT INTO settings (id, passcode_hash) VALUES (1, ?)")->execute([$hash]);
    }
    
    echo "Passcode hash updated successfully!\n";
} catch (PDOException $e) {
    echo "Error seeding database: " . $e->getMessage() . "\n";
}
