<?php
/**
 * API: Update Task Status
 * Legacy PHP 5 - AJAX endpoint for quick status updates
 *
 * SECURITY ISSUES:
 * - No rate limiting
 * - Basic CSRF check only
 * - No proper authentication verification
 */

header('Content-Type: application/json');

require_once '../includes/session.php';
require_once '../includes/functions.php';
require_once '../classes/Task.php';

// Check if logged in
if (!is_logged_in()) {
    echo json_encode(array('success' => false, 'error' => 'Not authenticated'));
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(array('success' => false, 'error' => 'Invalid method'));
    exit;
}

// CSRF check
if (!isset($_POST['csrf_token']) || !verify_csrf_token($_POST['csrf_token'])) {
    echo json_encode(array('success' => false, 'error' => 'Invalid token'));
    exit;
}

// Get parameters - NO VALIDATION!
$task_id = isset($_POST['task_id']) ? $_POST['task_id'] : 0;
$status = isset($_POST['status']) ? $_POST['status'] : '';

// Allowed statuses
$allowed_statuses = array('pending', 'in_progress', 'review', 'completed', 'cancelled');

if (!in_array($status, $allowed_statuses)) {
    echo json_encode(array('success' => false, 'error' => 'Invalid status'));
    exit;
}

// Load and update task
$task = new Task($task_id);

if (!$task->id) {
    echo json_encode(array('success' => false, 'error' => 'Task not found'));
    exit;
}

// No authorization check - any logged in user can update any task!
$task->status = $status;

if ($task->update()) {
    echo json_encode(array(
        'success' => true,
        'task_id' => $task->id,
        'new_status' => $status
    ));
} else {
    echo json_encode(array('success' => false, 'error' => 'Update failed'));
}
