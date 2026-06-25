<?php
require_once __DIR__ . '/middleware/cors.php';
require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/middleware/auth.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/anitas-bakers-api', '', $path);
$path = rtrim($path, '/');
if (empty($path)) $path = '/';

$method = $_SERVER['REQUEST_METHOD'];

switch (true) {

    // ===== AUTH =====
    case $path === '/api/auth/login' && $method === 'POST':
        require __DIR__ . '/api/auth/login.php';
        break;

    // ===== PRODUCTS =====
    case $path === '/api/products' && $method === 'GET':
        require __DIR__ . '/api/products/list.php';
        break;
    case $path === '/api/products' && $method === 'POST':
        require __DIR__ . '/api/products/create.php';
        break;
    case preg_match('#^/api/products/(\d+)$#', $path, $m) && $method === 'PUT':
        $productId = $m[1];
        require __DIR__ . '/api/products/update.php';
        break;
    case preg_match('#^/api/products/(\d+)$#', $path, $m) && $method === 'DELETE':
        $productId = $m[1];
        require __DIR__ . '/api/products/delete.php';
        break;

    // ===== ORDERS =====
    case $path === '/api/orders' && $method === 'POST':
        require __DIR__ . '/api/orders/create.php';
        break;
    case $path === '/api/orders' && $method === 'GET':
        require __DIR__ . '/api/orders/list.php';
        break;
    case preg_match('#^/api/orders/track/(.+)$#', $path, $m) && $method === 'GET':
        $refId = $m[1];
        require __DIR__ . '/api/orders/track.php';
        break;
    case preg_match('#^/api/orders/(\d+)/status$#', $path, $m) && $method === 'PUT':
        $orderId = $m[1];
        require __DIR__ . '/api/orders/update-status.php';
        break;

    // ===== PROMOS =====
    case $path === '/api/promos' && $method === 'GET':
        require __DIR__ . '/api/promos/list.php';
        break;
    case $path === '/api/promos/all' && $method === 'GET':
        require __DIR__ . '/api/promos/list-all.php';
        break;
    case $path === '/api/promos' && $method === 'POST':
        require __DIR__ . '/api/promos/create.php';
        break;
    case preg_match('#^/api/promos/(\d+)$#', $path, $m) && $method === 'PUT':
        $promoId = $m[1];
        require __DIR__ . '/api/promos/update.php';
        break;
    case preg_match('#^/api/promos/(\d+)$#', $path, $m) && $method === 'DELETE':
        $promoId = $m[1];
        require __DIR__ . '/api/promos/delete.php';
        break;

    // ===== REVIEWS =====
    case $path === '/api/reviews' && $method === 'GET':
        require __DIR__ . '/api/reviews/list.php';
        break;
    case $path === '/api/reviews/all' && $method === 'GET':
        require __DIR__ . '/api/reviews/list-all.php';
        break;
    case $path === '/api/reviews' && $method === 'POST':
        require __DIR__ . '/api/reviews/create.php';
        break;
    case preg_match('#^/api/reviews/(\d+)/approve$#', $path, $m) && $method === 'PUT':
        $reviewId = $m[1];
        require __DIR__ . '/api/reviews/approve.php';
        break;

    // ===== INQUIRIES =====
    case $path === '/api/inquiries' && $method === 'GET':
        require __DIR__ . '/api/inquiries/list.php';
        break;
    case $path === '/api/inquiries' && $method === 'POST':
        require __DIR__ . '/api/inquiries/create.php';
        break;
    case preg_match('#^/api/inquiries/(\d+)/status$#', $path, $m) && $method === 'PUT':
        $inquiryId = $m[1];
        require __DIR__ . '/api/inquiries/update-status.php';
        break;

    // ===== SETTINGS =====
    case $path === '/api/settings' && $method === 'GET':
        require __DIR__ . '/api/settings/get.php';
        break;
    case $path === '/api/settings' && $method === 'PUT':
        require __DIR__ . '/api/settings/update.php';
        break;

    // ===== DEFAULT =====
    default:
        jsonResponse(['success' => false, 'message' => 'Endpoint not found: ' . $method . ' ' . $path], 404);
}
