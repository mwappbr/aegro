<?php
/**
 * TaskMaster Pro - Entry Point
 * Redirects to appropriate page based on authentication
 */

require_once 'includes/session.php';
require_once 'includes/functions.php';

if (is_logged_in()) {
    header('Location: dashboard.php');
} else {
    header('Location: login.php');
}
exit;
