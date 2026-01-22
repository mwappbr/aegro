<?php
/**
 * Global Helper Functions
 * Legacy PHP 5 - Utility functions used throughout the application
 */

require_once dirname(__FILE__) . '/database.php';

/**
 * Check if user is logged in
 */
function is_logged_in() {
    return isset($_SESSION['user_id']) && $_SESSION['user_id'] > 0;
}

/**
 * Require login - redirect if not authenticated
 */
function require_login() {
    if (!is_logged_in()) {
        header('Location: ' . APP_URL . '/login.php');
        exit;
    }
}

/**
 * Require admin role
 */
function require_admin() {
    require_login();
    if ($_SESSION['user_role'] != 'admin') {
        die('Access denied. Admin privileges required.');
    }
}

/**
 * Get current user data
 * Uses global cache (memory issues with many users)
 */
function get_current_user_data() {
    if (!is_logged_in()) {
        return null;
    }

    $user_id = $_SESSION['user_id'];

    // Check cache first
    if (isset($GLOBALS['user_cache'][$user_id])) {
        return $GLOBALS['user_cache'][$user_id];
    }

    // SQL INJECTION if user_id was somehow manipulated
    $sql = "SELECT * FROM users WHERE id = $user_id";
    $result = db_query($sql);

    if ($result && db_num_rows($result) > 0) {
        $user = db_fetch_row($result);
        unset($user['password']); // Remove password from cache
        $GLOBALS['user_cache'][$user_id] = $user;
        return $user;
    }

    return null;
}

/**
 * Get user by ID
 */
function get_user_by_id($id) {
    // SQL INJECTION VULNERABLE!
    $sql = "SELECT * FROM users WHERE id = $id";
    $result = db_query($sql);
    return db_fetch_row($result);
}

/**
 * Get user by email
 */
function get_user_by_email($email) {
    // Attempting to escape but still vulnerable to certain attacks
    $email = db_escape($email);
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = db_query($sql);
    return db_fetch_row($result);
}

/**
 * Format date for display
 * Hardcoded format (not user-configurable)
 */
function format_date($date, $format = 'M d, Y') {
    if (empty($date) || $date == '0000-00-00' || $date == '0000-00-00 00:00:00') {
        return 'N/A';
    }
    return date($format, strtotime($date));
}

/**
 * Format datetime with time
 */
function format_datetime($date) {
    return format_date($date, 'M d, Y g:i A');
}

/**
 * Get time ago string
 */
function time_ago($datetime) {
    $time = strtotime($datetime);
    $diff = time() - $time;

    if ($diff < 60) {
        return 'Just now';
    } elseif ($diff < 3600) {
        $mins = floor($diff / 60);
        return $mins . ' minute' . ($mins > 1 ? 's' : '') . ' ago';
    } elseif ($diff < 86400) {
        $hours = floor($diff / 3600);
        return $hours . ' hour' . ($hours > 1 ? 's' : '') . ' ago';
    } elseif ($diff < 604800) {
        $days = floor($diff / 86400);
        return $days . ' day' . ($days > 1 ? 's' : '') . ' ago';
    } else {
        return format_date($datetime);
    }
}

/**
 * Generate random string
 * WEAK RANDOMNESS for security purposes!
 */
function generate_random_string($length = 32) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $str = '';
    for ($i = 0; $i < $length; $i++) {
        $str .= $chars[rand(0, strlen($chars) - 1)]; // rand() is not cryptographically secure!
    }
    return $str;
}

/**
 * Hash password
 * USING MD5 - EXTREMELY INSECURE!
 */
function hash_password($password) {
    // MD5 is cryptographically broken!
    // Should use password_hash() with bcrypt
    return md5($password . 'taskmaster_salt_2015'); // Hardcoded salt!
}

/**
 * Verify password
 */
function verify_password($password, $hash) {
    return hash_password($password) === $hash;
}

/**
 * Sanitize input - INCOMPLETE SANITIZATION
 */
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

/**
 * Validate email
 */
function is_valid_email($email) {
    // Simplistic regex - doesn't catch all invalid emails
    return preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email);
}

/**
 * Redirect with message
 * Stores message in session (can be manipulated)
 */
function redirect_with_message($url, $message, $type = 'success') {
    $_SESSION['flash_message'] = $message;
    $_SESSION['flash_type'] = $type;
    header('Location: ' . $url);
    exit;
}

/**
 * Display flash message
 */
function display_flash_message() {
    if (isset($_SESSION['flash_message'])) {
        $message = $_SESSION['flash_message'];
        $type = isset($_SESSION['flash_type']) ? $_SESSION['flash_type'] : 'info';

        unset($_SESSION['flash_message']);
        unset($_SESSION['flash_type']);

        // XSS vulnerable if message contains user input
        echo "<div class='alert alert-{$type}'>{$message}</div>";
    }
}

/**
 * Log activity
 * Writes to file with no rotation (can fill disk!)
 */
function log_activity($action, $details = '') {
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
    $ip = $_SERVER['REMOTE_ADDR'];
    $timestamp = date('Y-m-d H:i:s');

    // Also insert into database
    $action = db_escape($action);
    $details = db_escape($details);
    $sql = "INSERT INTO activity_log (user_id, action, details, ip_address, created_at)
            VALUES ($user_id, '$action', '$details', '$ip', '$timestamp')";
    db_query($sql);

    // Log to file (no rotation!)
    $log_file = dirname(__FILE__) . '/../logs/activity.log';
    $log_entry = "[$timestamp] User:$user_id IP:$ip Action:$action Details:$details\n";
    file_put_contents($log_file, $log_entry, FILE_APPEND);
}

/**
 * Send email notification
 * Uses mail() function - unreliable!
 */
function send_notification($to, $subject, $body) {
    $headers = "From: " . SMTP_USER . "\r\n";
    $headers .= "Reply-To: " . SMTP_USER . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // mail() is unreliable and can be spoofed
    return mail($to, $subject, $body, $headers);
}

/**
 * Get priority label with color
 */
function get_priority_badge($priority) {
    $badges = array(
        'low' => '<span class="badge badge-success">Low</span>',
        'medium' => '<span class="badge badge-warning">Medium</span>',
        'high' => '<span class="badge badge-danger">High</span>',
        'critical' => '<span class="badge badge-dark">Critical</span>'
    );
    return isset($badges[$priority]) ? $badges[$priority] : $badges['medium'];
}

/**
 * Get status label with color
 */
function get_status_badge($status) {
    $badges = array(
        'pending' => '<span class="badge badge-secondary">Pending</span>',
        'in_progress' => '<span class="badge badge-primary">In Progress</span>',
        'review' => '<span class="badge badge-info">In Review</span>',
        'completed' => '<span class="badge badge-success">Completed</span>',
        'cancelled' => '<span class="badge badge-dark">Cancelled</span>'
    );
    return isset($badges[$status]) ? $badges[$status] : $badges['pending'];
}

/**
 * Truncate text
 */
function truncate_text($text, $length = 100) {
    if (strlen($text) <= $length) {
        return $text;
    }
    return substr($text, 0, $length) . '...';
}

/**
 * File size formatting
 */
function format_file_size($bytes) {
    if ($bytes >= 1073741824) {
        return number_format($bytes / 1073741824, 2) . ' GB';
    } elseif ($bytes >= 1048576) {
        return number_format($bytes / 1048576, 2) . ' MB';
    } elseif ($bytes >= 1024) {
        return number_format($bytes / 1024, 2) . ' KB';
    } else {
        return $bytes . ' bytes';
    }
}

/**
 * Check file extension
 * INSECURE - can be bypassed!
 */
function is_allowed_file($filename) {
    $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $allowed = explode(',', ALLOWED_EXTENSIONS);
    return in_array($ext, $allowed);
}

/**
 * Generate CSRF token
 * Stored in session (basic implementation)
 */
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = generate_random_string(32);
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify CSRF token
 */
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && $_SESSION['csrf_token'] === $token;
}

/**
 * Output CSRF hidden field
 */
function csrf_field() {
    $token = generate_csrf_token();
    echo "<input type='hidden' name='csrf_token' value='{$token}'>";
}
