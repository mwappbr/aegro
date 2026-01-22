<?php
/**
 * Task Class
 * Legacy PHP 5 - Task model with database operations
 */

require_once dirname(__FILE__) . '/../includes/database.php';
require_once dirname(__FILE__) . '/../includes/functions.php';

class Task {
    // Public properties
    var $id;
    var $project_id;
    var $title;
    var $description;
    var $priority;
    var $status;
    var $assigned_to;
    var $created_by;
    var $due_date;
    var $estimated_hours;
    var $actual_hours;
    var $tags;
    var $created_at;
    var $updated_at;
    var $completed_at;

    // Constructor
    function Task($id = null) {
        if ($id !== null) {
            $this->load($id);
        }
    }

    /**
     * Load task from database
     */
    function load($id) {
        // SQL INJECTION!
        $sql = "SELECT * FROM tasks WHERE id = $id";
        $result = db_query($sql);

        if ($result && db_num_rows($result) > 0) {
            $row = db_fetch_row($result);
            $this->populate($row);
            return true;
        }
        return false;
    }

    /**
     * Populate object from array
     */
    function populate($data) {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    /**
     * Save task
     */
    function save() {
        if ($this->id) {
            return $this->update();
        } else {
            return $this->insert();
        }
    }

    /**
     * Insert new task
     */
    function insert() {
        if (empty($this->title)) {
            return false;
        }

        $project_id = intval($this->project_id);
        $title = db_escape($this->title);
        $description = db_escape($this->description);
        $priority = db_escape($this->priority ? $this->priority : 'medium');
        $status = db_escape($this->status ? $this->status : 'pending');
        $assigned_to = intval($this->assigned_to);
        $created_by = intval($this->created_by);
        $due_date = $this->due_date ? "'" . db_escape($this->due_date) . "'" : 'NULL';
        $estimated_hours = floatval($this->estimated_hours);
        $tags = db_escape($this->tags);

        $sql = "INSERT INTO tasks
                (project_id, title, description, priority, status, assigned_to, created_by,
                 due_date, estimated_hours, tags, created_at)
                VALUES
                ($project_id, '$title', '$description', '$priority', '$status', $assigned_to,
                 $created_by, $due_date, $estimated_hours, '$tags', NOW())";

        if (db_query($sql)) {
            $this->id = db_insert_id();
            log_activity('task_created', "Task ID: {$this->id}, Title: {$this->title}");

            // Send notification to assigned user
            $this->notify_assignment();

            return true;
        }
        return false;
    }

    /**
     * Update task
     */
    function update() {
        if (!$this->id) {
            return false;
        }

        $old_status = $this->get_old_status();

        $project_id = intval($this->project_id);
        $title = db_escape($this->title);
        $description = db_escape($this->description);
        $priority = db_escape($this->priority);
        $status = db_escape($this->status);
        $assigned_to = intval($this->assigned_to);
        $due_date = $this->due_date ? "'" . db_escape($this->due_date) . "'" : 'NULL';
        $estimated_hours = floatval($this->estimated_hours);
        $actual_hours = floatval($this->actual_hours);
        $tags = db_escape($this->tags);

        // Set completed_at if status changed to completed
        $completed_sql = '';
        if ($status == 'completed' && $old_status != 'completed') {
            $completed_sql = ', completed_at = NOW()';
        } elseif ($status != 'completed') {
            $completed_sql = ', completed_at = NULL';
        }

        $sql = "UPDATE tasks SET
                    project_id = $project_id,
                    title = '$title',
                    description = '$description',
                    priority = '$priority',
                    status = '$status',
                    assigned_to = $assigned_to,
                    due_date = $due_date,
                    estimated_hours = $estimated_hours,
                    actual_hours = $actual_hours,
                    tags = '$tags',
                    updated_at = NOW()
                    $completed_sql
                WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('task_updated', "Task ID: {$this->id}");

            // Add comment for status change
            if ($old_status != $status) {
                $this->add_comment("Status changed from '$old_status' to '$status'", 'system');
            }

            return true;
        }
        return false;
    }

    /**
     * Get old status before update
     */
    function get_old_status() {
        if (!$this->id) return null;
        $sql = "SELECT status FROM tasks WHERE id = {$this->id}";
        $result = db_query($sql);
        $row = db_fetch_row($result);
        return $row ? $row['status'] : null;
    }

    /**
     * Delete task
     */
    function delete() {
        if (!$this->id) {
            return false;
        }

        // Delete attachments first
        $sql = "DELETE FROM attachments WHERE task_id = {$this->id}";
        db_query($sql);

        // Delete comments
        $sql = "DELETE FROM comments WHERE task_id = {$this->id}";
        db_query($sql);

        // Delete task
        $sql = "DELETE FROM tasks WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('task_deleted', "Task ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Get tasks with filters
     * NO PAGINATION - loads everything into memory!
     */
    function get_tasks($filters = array()) {
        $where = array('1=1');

        if (!empty($filters['project_id'])) {
            $where[] = "project_id = " . intval($filters['project_id']);
        }
        if (!empty($filters['assigned_to'])) {
            $where[] = "assigned_to = " . intval($filters['assigned_to']);
        }
        if (!empty($filters['status'])) {
            $where[] = "status = '" . db_escape($filters['status']) . "'";
        }
        if (!empty($filters['priority'])) {
            $where[] = "priority = '" . db_escape($filters['priority']) . "'";
        }
        if (!empty($filters['search'])) {
            $search = db_escape($filters['search']);
            $where[] = "(title LIKE '%$search%' OR description LIKE '%$search%' OR tags LIKE '%$search%')";
        }
        if (!empty($filters['due_before'])) {
            $where[] = "due_date <= '" . db_escape($filters['due_before']) . "'";
        }
        if (!empty($filters['overdue'])) {
            $where[] = "due_date < CURDATE() AND status != 'completed'";
        }

        $where_sql = implode(' AND ', $where);
        $order = isset($filters['order']) ? db_escape($filters['order']) : 'created_at DESC';

        $sql = "SELECT t.*, u.name as assigned_name, p.name as project_name
                FROM tasks t
                LEFT JOIN users u ON t.assigned_to = u.id
                LEFT JOIN projects p ON t.project_id = p.id
                WHERE $where_sql
                ORDER BY $order";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get task statistics
     */
    function get_stats($user_id = null) {
        $where = $user_id ? "WHERE assigned_to = $user_id" : '';
        $user_where = $user_id ? "AND assigned_to = $user_id" : '';

        $stats = array();

        // Total tasks
        $result = db_query("SELECT COUNT(*) as count FROM tasks $where");
        $stats['total'] = db_fetch_row($result)['count'];

        // By status
        $result = db_query("SELECT status, COUNT(*) as count FROM tasks $where GROUP BY status");
        $stats['by_status'] = array();
        while ($row = db_fetch_row($result)) {
            $stats['by_status'][$row['status']] = $row['count'];
        }

        // Overdue
        $result = db_query("SELECT COUNT(*) as count FROM tasks WHERE due_date < CURDATE() AND status != 'completed' $user_where");
        $stats['overdue'] = db_fetch_row($result)['count'];

        // Due today
        $result = db_query("SELECT COUNT(*) as count FROM tasks WHERE due_date = CURDATE() AND status != 'completed' $user_where");
        $stats['due_today'] = db_fetch_row($result)['count'];

        // Completed this week
        $result = db_query("SELECT COUNT(*) as count FROM tasks WHERE completed_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) $user_where");
        $stats['completed_this_week'] = db_fetch_row($result)['count'];

        return $stats;
    }

    /**
     * Add comment to task
     */
    function add_comment($content, $type = 'user') {
        if (!$this->id) return false;

        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
        $content = db_escape($content);
        $type = db_escape($type);

        $sql = "INSERT INTO comments (task_id, user_id, content, type, created_at)
                VALUES ({$this->id}, $user_id, '$content', '$type', NOW())";

        return db_query($sql);
    }

    /**
     * Get comments for task
     */
    function get_comments() {
        if (!$this->id) return array();

        $sql = "SELECT c.*, u.name as user_name, u.avatar as user_avatar
                FROM comments c
                LEFT JOIN users u ON c.user_id = u.id
                WHERE c.task_id = {$this->id}
                ORDER BY c.created_at ASC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get attachments for task
     */
    function get_attachments() {
        if (!$this->id) return array();

        $sql = "SELECT a.*, u.name as uploaded_by_name
                FROM attachments a
                LEFT JOIN users u ON a.uploaded_by = u.id
                WHERE a.task_id = {$this->id}
                ORDER BY a.created_at DESC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Log time for task
     */
    function log_time($hours, $description = '') {
        if (!$this->id) return false;

        $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;
        $hours = floatval($hours);
        $description = db_escape($description);

        $sql = "INSERT INTO time_logs (task_id, user_id, hours, description, logged_at)
                VALUES ({$this->id}, $user_id, $hours, '$description', NOW())";

        if (db_query($sql)) {
            // Update actual hours on task
            db_query("UPDATE tasks SET actual_hours = actual_hours + $hours WHERE id = {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Notify assigned user
     */
    function notify_assignment() {
        if (!$this->assigned_to) return;

        $user = new User($this->assigned_to);
        if ($user->email) {
            $subject = "New Task Assigned: {$this->title}";
            $body = "You have been assigned a new task: {$this->title}<br><br>";
            $body .= "Priority: {$this->priority}<br>";
            $body .= "Due Date: " . format_date($this->due_date) . "<br><br>";
            $body .= "<a href='" . APP_URL . "/task.php?id={$this->id}'>View Task</a>";

            send_notification($user->email, $subject, $body);
        }
    }

    /**
     * Check if task is overdue
     */
    function is_overdue() {
        if (empty($this->due_date) || $this->status == 'completed') {
            return false;
        }
        return strtotime($this->due_date) < strtotime('today');
    }

    /**
     * Get activity log for task
     */
    function get_activity() {
        if (!$this->id) return array();

        $sql = "SELECT * FROM activity_log
                WHERE details LIKE '%Task ID: {$this->id}%'
                ORDER BY created_at DESC
                LIMIT 50";

        $result = db_query($sql);
        return db_fetch_all($result);
    }
}
