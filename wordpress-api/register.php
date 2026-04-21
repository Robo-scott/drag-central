<?php
/**
 * Drag Central User Registration Endpoint
 * Place this file in your WordPress root directory
 */

// Allow CORS for the React app
header('Access-Control-Allow-Origin: https://dragcentral.co.nz');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load WordPress
require_once('wp-load.php');

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Validate required fields
$username = sanitize_user($input['username'] ?? '');
$email = sanitize_email($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    http_response_code(400);
    echo json_encode(['error' => 'Username, email, and password are required']);
    exit;
}

// Check if username exists
if (username_exists($username)) {
    http_response_code(409);
    echo json_encode(['error' => 'Username already exists']);
    exit;
}

// Check if email exists
if (email_exists($email)) {
    http_response_code(409);
    echo json_encode(['error' => 'Email already registered']);
    exit;
}

// Create user
$user_id = wp_create_user($username, $password, $email);

if (is_wp_error($user_id)) {
    http_response_code(500);
    echo json_encode(['error' => $user_id->get_error_message()]);
    exit;
}

// Set user role
$user = new WP_User($user_id);
$user->set_role('subscriber');

// Send notification to admin
$admin_email = get_option('admin_email');
$subject = 'New Drag Central Registration: ' . $username;
$message = "A new user has registered on Drag Central:\n\n";
$message .= "Username: " . $username . "\n";
$message .= "Email: " . $email . "\n";
$message .= "User ID: " . $user_id . "\n\n";
$message .= "View user: " . admin_url('user-edit.php?user_id=' . $user_id);
wp_mail($admin_email, $subject, $message);

// Return success
http_response_code(201);
echo json_encode([
    'success' => true,
    'message' => 'Registration successful',
    'user_id' => $user_id,
    'username' => $username
]);
