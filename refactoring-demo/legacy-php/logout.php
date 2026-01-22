<?php
/**
 * Logout Handler
 * Legacy PHP 5 - Session destruction
 */

require_once 'includes/session.php';
require_once 'includes/functions.php';

// Log the logout
if (is_logged_in()) {
    log_activity('logout', 'User logged out');
}

// Clear remember me cookie
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, '/');
}

// Destroy session
destroy_session();

// Redirect to login
header('Location: login.php');
exit;
