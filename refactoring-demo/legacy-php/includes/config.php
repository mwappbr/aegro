<?php
/**
 * TaskMaster Configuration File
 * Legacy PHP 5 - Global Configuration
 *
 * WARNING: This file contains multiple security anti-patterns for demo purposes
 */

// Error reporting - shows all errors (bad for production!)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database Configuration - HARDCODED CREDENTIALS (Security Issue #1)
// Uses environment variables for Docker, falls back to hardcoded values
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') ?: 'password123');
define('DB_NAME', getenv('DB_NAME') ?: 'taskmaster');

// Application Settings
define('APP_NAME', 'TaskMaster Pro');
define('APP_VERSION', '2.1.3');
define('APP_URL', 'http://localhost/taskmaster');

// File Upload Settings - INSECURE DEFAULTS (Security Issue #2)
define('UPLOAD_DIR', dirname(__FILE__) . '/../uploads/');
define('MAX_UPLOAD_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_EXTENSIONS', 'jpg,jpeg,png,gif,pdf,doc,docx,xls,xlsx,txt,zip'); // Too permissive!

// Session Configuration
define('SESSION_LIFETIME', 86400 * 7); // 7 days - too long!
define('SESSION_NAME', 'TASKMASTER_SESSID');

// API Settings - HARDCODED API KEY (Security Issue #3)
define('API_KEY', 'tm_api_key_12345_secret');
define('API_RATE_LIMIT', 1000); // per hour

// Email Configuration - CREDENTIALS IN CODE (Security Issue #4)
define('SMTP_HOST', 'smtp.example.com');
define('SMTP_USER', 'notifications@taskmaster.com');
define('SMTP_PASS', 'email_password_123');
define('SMTP_PORT', 587);

// Feature Flags - stored as constants (inflexible)
define('FEATURE_PROJECTS', true);
define('FEATURE_TEAMS', true);
define('FEATURE_ATTACHMENTS', true);
define('FEATURE_COMMENTS', true);
define('FEATURE_ACTIVITY_LOG', true);

// Timezone (hardcoded, not user-configurable)
date_default_timezone_set('America/New_York');

// Debug mode - LEFT ON IN "PRODUCTION" (Security Issue #5)
define('DEBUG_MODE', true);

// Global arrays for caching (poor pattern)
$GLOBALS['user_cache'] = array();
$GLOBALS['task_cache'] = array();
$GLOBALS['project_cache'] = array();
