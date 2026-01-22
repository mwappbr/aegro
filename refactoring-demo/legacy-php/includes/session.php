<?php
/**
 * Session Management
 * Legacy PHP 5 - Session initialization and handling
 */

require_once dirname(__FILE__) . '/config.php';

// Configure session BEFORE starting
ini_set('session.cookie_lifetime', SESSION_LIFETIME);
ini_set('session.gc_maxlifetime', SESSION_LIFETIME);
ini_set('session.cookie_httponly', 1); // At least this is set!
// Missing: session.cookie_secure for HTTPS
// Missing: session.cookie_samesite

// Set session name
session_name(SESSION_NAME);

// Start session if not already started
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Session fixation protection - regenerate ID periodically
// But implementation is flawed - only checks time, not login state
if (!isset($_SESSION['last_regeneration'])) {
    $_SESSION['last_regeneration'] = time();
} elseif (time() - $_SESSION['last_regeneration'] > 3600) {
    session_regenerate_id(true);
    $_SESSION['last_regeneration'] = time();
}

// Track session info (potential privacy issue)
$_SESSION['last_activity'] = time();
$_SESSION['ip_address'] = $_SERVER['REMOTE_ADDR'];
$_SESSION['user_agent'] = $_SERVER['HTTP_USER_AGENT'];

/**
 * Destroy session completely
 */
function destroy_session() {
    $_SESSION = array();

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    session_destroy();
}

/**
 * Check for session hijacking (basic)
 * Not comprehensive - can be bypassed
 */
function validate_session() {
    // Check if IP changed (causes issues with mobile users)
    if (isset($_SESSION['ip_address']) && $_SESSION['ip_address'] !== $_SERVER['REMOTE_ADDR']) {
        // Could be session hijacking or just mobile network change
        // Logged but not enforced (commented out for "user experience")
        // destroy_session();
        // header('Location: login.php');
        // exit;
    }

    // Check session timeout
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > SESSION_LIFETIME)) {
        destroy_session();
        header('Location: login.php?timeout=1');
        exit;
    }
}

// Run session validation
validate_session();
