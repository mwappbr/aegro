<?php
/**
 * Project Class
 * Legacy PHP 5 - Project model for organizing tasks
 */

require_once dirname(__FILE__) . '/../includes/database.php';
require_once dirname(__FILE__) . '/../includes/functions.php';

class Project {
    var $id;
    var $name;
    var $description;
    var $status;
    var $owner_id;
    var $start_date;
    var $end_date;
    var $budget;
    var $color;
    var $created_at;
    var $updated_at;

    function Project($id = null) {
        if ($id !== null) {
            $this->load($id);
        }
    }

    function load($id) {
        $sql = "SELECT * FROM projects WHERE id = $id"; // SQL injection!
        $result = db_query($sql);

        if ($result && db_num_rows($result) > 0) {
            $this->populate(db_fetch_row($result));
            return true;
        }
        return false;
    }

    function populate($data) {
        foreach ($data as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    function save() {
        if ($this->id) {
            return $this->update();
        } else {
            return $this->insert();
        }
    }

    function insert() {
        if (empty($this->name)) return false;

        $name = db_escape($this->name);
        $description = db_escape($this->description);
        $status = db_escape($this->status ? $this->status : 'active');
        $owner_id = intval($this->owner_id);
        $start_date = $this->start_date ? "'" . db_escape($this->start_date) . "'" : 'NULL';
        $end_date = $this->end_date ? "'" . db_escape($this->end_date) . "'" : 'NULL';
        $budget = floatval($this->budget);
        $color = db_escape($this->color ? $this->color : '#3498db');

        $sql = "INSERT INTO projects (name, description, status, owner_id, start_date, end_date, budget, color, created_at)
                VALUES ('$name', '$description', '$status', $owner_id, $start_date, $end_date, $budget, '$color', NOW())";

        if (db_query($sql)) {
            $this->id = db_insert_id();
            log_activity('project_created', "Project ID: {$this->id}");
            return true;
        }
        return false;
    }

    function update() {
        if (!$this->id) return false;

        $name = db_escape($this->name);
        $description = db_escape($this->description);
        $status = db_escape($this->status);
        $owner_id = intval($this->owner_id);
        $start_date = $this->start_date ? "'" . db_escape($this->start_date) . "'" : 'NULL';
        $end_date = $this->end_date ? "'" . db_escape($this->end_date) . "'" : 'NULL';
        $budget = floatval($this->budget);
        $color = db_escape($this->color);

        $sql = "UPDATE projects SET
                    name = '$name',
                    description = '$description',
                    status = '$status',
                    owner_id = $owner_id,
                    start_date = $start_date,
                    end_date = $end_date,
                    budget = $budget,
                    color = '$color',
                    updated_at = NOW()
                WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('project_updated', "Project ID: {$this->id}");
            return true;
        }
        return false;
    }

    function delete() {
        if (!$this->id) return false;

        // Check for tasks - prevent deletion if tasks exist
        $result = db_query("SELECT COUNT(*) as count FROM tasks WHERE project_id = {$this->id}");
        $row = db_fetch_row($result);
        if ($row['count'] > 0) {
            return false; // Has tasks, cannot delete
        }

        // Delete team members
        db_query("DELETE FROM project_members WHERE project_id = {$this->id}");

        // Delete project
        $sql = "DELETE FROM projects WHERE id = {$this->id}";
        if (db_query($sql)) {
            log_activity('project_deleted', "Project ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Get all projects
     */
    function get_all($filters = array()) {
        $where = array('1=1');

        if (!empty($filters['status'])) {
            $where[] = "status = '" . db_escape($filters['status']) . "'";
        }
        if (!empty($filters['owner_id'])) {
            $where[] = "owner_id = " . intval($filters['owner_id']);
        }
        if (!empty($filters['search'])) {
            $search = db_escape($filters['search']);
            $where[] = "(name LIKE '%$search%' OR description LIKE '%$search%')";
        }

        $where_sql = implode(' AND ', $where);

        $sql = "SELECT p.*, u.name as owner_name,
                    (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count,
                    (SELECT COUNT(*) FROM tasks WHERE project_id = p.id AND status = 'completed') as completed_count
                FROM projects p
                LEFT JOIN users u ON p.owner_id = u.id
                WHERE $where_sql
                ORDER BY p.name ASC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get projects for user (as member or owner)
     */
    function get_user_projects($user_id) {
        $user_id = intval($user_id);

        $sql = "SELECT DISTINCT p.*, u.name as owner_name
                FROM projects p
                LEFT JOIN users u ON p.owner_id = u.id
                LEFT JOIN project_members pm ON p.id = pm.project_id
                WHERE p.owner_id = $user_id OR pm.user_id = $user_id
                ORDER BY p.name ASC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get project members
     */
    function get_members() {
        if (!$this->id) return array();

        $sql = "SELECT u.*, pm.role as project_role, pm.joined_at
                FROM project_members pm
                JOIN users u ON pm.user_id = u.id
                WHERE pm.project_id = {$this->id}
                ORDER BY u.name ASC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Add member to project
     */
    function add_member($user_id, $role = 'member') {
        if (!$this->id) return false;

        $user_id = intval($user_id);
        $role = db_escape($role);

        // Check if already a member
        $check = db_query("SELECT id FROM project_members WHERE project_id = {$this->id} AND user_id = $user_id");
        if (db_num_rows($check) > 0) {
            return false;
        }

        $sql = "INSERT INTO project_members (project_id, user_id, role, joined_at)
                VALUES ({$this->id}, $user_id, '$role', NOW())";

        if (db_query($sql)) {
            log_activity('member_added', "Project ID: {$this->id}, User ID: $user_id");
            return true;
        }
        return false;
    }

    /**
     * Remove member from project
     */
    function remove_member($user_id) {
        if (!$this->id) return false;

        $user_id = intval($user_id);

        $sql = "DELETE FROM project_members WHERE project_id = {$this->id} AND user_id = $user_id";

        if (db_query($sql)) {
            log_activity('member_removed', "Project ID: {$this->id}, User ID: $user_id");
            return true;
        }
        return false;
    }

    /**
     * Check if user has access to project
     */
    function user_has_access($user_id) {
        if (!$this->id) return false;

        // Owner always has access
        if ($this->owner_id == $user_id) return true;

        // Check if member
        $result = db_query("SELECT id FROM project_members WHERE project_id = {$this->id} AND user_id = $user_id");
        return db_num_rows($result) > 0;
    }

    /**
     * Get project statistics
     */
    function get_stats() {
        if (!$this->id) return array();

        $stats = array();

        // Task counts
        $result = db_query("SELECT
                            COUNT(*) as total,
                            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
                            SUM(CASE WHEN status = 'in_progress' THEN 1 ELSE 0 END) as in_progress,
                            SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                            SUM(CASE WHEN due_date < CURDATE() AND status != 'completed' THEN 1 ELSE 0 END) as overdue
                           FROM tasks WHERE project_id = {$this->id}");
        $row = db_fetch_row($result);
        $stats['tasks'] = $row;

        // Progress percentage
        $stats['progress'] = $row['total'] > 0 ? round(($row['completed'] / $row['total']) * 100) : 0;

        // Hours
        $result = db_query("SELECT
                            SUM(estimated_hours) as estimated,
                            SUM(actual_hours) as actual
                           FROM tasks WHERE project_id = {$this->id}");
        $stats['hours'] = db_fetch_row($result);

        // Member count
        $result = db_query("SELECT COUNT(*) as count FROM project_members WHERE project_id = {$this->id}");
        $stats['member_count'] = db_fetch_row($result)['count'] + 1; // +1 for owner

        return $stats;
    }

    /**
     * Get recent activity for project
     */
    function get_recent_activity($limit = 20) {
        if (!$this->id) return array();

        // Get task IDs for this project
        $result = db_query("SELECT id FROM tasks WHERE project_id = {$this->id}");
        $task_ids = array();
        while ($row = db_fetch_row($result)) {
            $task_ids[] = $row['id'];
        }

        if (empty($task_ids)) return array();

        $task_ids_str = implode(',', $task_ids);

        $sql = "SELECT a.*, u.name as user_name
                FROM activity_log a
                LEFT JOIN users u ON a.user_id = u.id
                WHERE a.details LIKE '%Project ID: {$this->id}%'
                   OR a.details REGEXP 'Task ID: ($task_ids_str)'
                ORDER BY a.created_at DESC
                LIMIT $limit";

        $result = db_query($sql);
        return db_fetch_all($result);
    }
}
