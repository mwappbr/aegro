<?php
/**
 * User Class
 * Legacy PHP 5 - User model with database operations
 *
 * Note: This is NOT proper OOP - it's "PHP 4 style" classes
 * Mixed concerns, no separation, tight coupling to database
 */

require_once dirname(__FILE__) . '/../includes/database.php';
require_once dirname(__FILE__) . '/../includes/functions.php';

class User {
    // Public properties (no encapsulation!)
    var $id;
    var $email;
    var $password;
    var $name;
    var $role;
    var $avatar;
    var $department;
    var $phone;
    var $created_at;
    var $updated_at;
    var $last_login;
    var $is_active;

    // Constructor - loads user if ID provided
    function User($id = null) { // PHP 4 style constructor!
        if ($id !== null) {
            $this->load($id);
        }
    }

    /**
     * Load user from database
     * SQL INJECTION VULNERABLE!
     */
    function load($id) {
        $sql = "SELECT * FROM users WHERE id = $id"; // No escaping!
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
        $this->id = $data['id'];
        $this->email = $data['email'];
        $this->password = $data['password'];
        $this->name = $data['name'];
        $this->role = $data['role'];
        $this->avatar = $data['avatar'];
        $this->department = $data['department'];
        $this->phone = $data['phone'];
        $this->created_at = $data['created_at'];
        $this->updated_at = $data['updated_at'];
        $this->last_login = $data['last_login'];
        $this->is_active = $data['is_active'];
    }

    /**
     * Save user (insert or update)
     */
    function save() {
        if ($this->id) {
            return $this->update();
        } else {
            return $this->insert();
        }
    }

    /**
     * Insert new user
     */
    function insert() {
        // Basic validation (incomplete!)
        if (empty($this->email) || empty($this->password) || empty($this->name)) {
            return false;
        }

        // Check if email exists
        $email = db_escape($this->email);
        $check = db_query("SELECT id FROM users WHERE email = '$email'");
        if (db_num_rows($check) > 0) {
            return false; // Email exists
        }

        // Hash password using weak MD5
        $password_hash = hash_password($this->password);

        $name = db_escape($this->name);
        $role = db_escape($this->role ? $this->role : 'user');
        $department = db_escape($this->department);
        $phone = db_escape($this->phone);

        $sql = "INSERT INTO users (email, password, name, role, department, phone, is_active, created_at)
                VALUES ('$email', '$password_hash', '$name', '$role', '$department', '$phone', 1, NOW())";

        if (db_query($sql)) {
            $this->id = db_insert_id();
            log_activity('user_created', "User ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Update existing user
     */
    function update() {
        if (!$this->id) {
            return false;
        }

        $name = db_escape($this->name);
        $email = db_escape($this->email);
        $role = db_escape($this->role);
        $department = db_escape($this->department);
        $phone = db_escape($this->phone);
        $is_active = $this->is_active ? 1 : 0;

        $sql = "UPDATE users SET
                    name = '$name',
                    email = '$email',
                    role = '$role',
                    department = '$department',
                    phone = '$phone',
                    is_active = $is_active,
                    updated_at = NOW()
                WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('user_updated', "User ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Change password
     */
    function change_password($new_password) {
        if (!$this->id) {
            return false;
        }

        $password_hash = hash_password($new_password);

        $sql = "UPDATE users SET password = '$password_hash', updated_at = NOW()
                WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('password_changed', "User ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Authenticate user
     * Returns user object on success, false on failure
     */
    function authenticate($email, $password) {
        $email = db_escape($email);
        $sql = "SELECT * FROM users WHERE email = '$email' AND is_active = 1";
        $result = db_query($sql);

        if ($result && db_num_rows($result) > 0) {
            $row = db_fetch_row($result);

            // Verify password (using weak MD5!)
            if (verify_password($password, $row['password'])) {
                $this->populate($row);

                // Update last login
                db_query("UPDATE users SET last_login = NOW() WHERE id = {$this->id}");

                log_activity('login_success', "User: {$this->email}");
                return $this;
            }
        }

        log_activity('login_failed', "Email: $email");
        return false;
    }

    /**
     * Delete user (soft delete)
     */
    function delete() {
        if (!$this->id) {
            return false;
        }

        // Soft delete - just deactivate
        $sql = "UPDATE users SET is_active = 0, updated_at = NOW() WHERE id = {$this->id}";

        if (db_query($sql)) {
            log_activity('user_deleted', "User ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Get all users
     * No pagination = memory issues with many users!
     */
    function get_all($include_inactive = false) {
        $where = $include_inactive ? '' : 'WHERE is_active = 1';
        $sql = "SELECT * FROM users $where ORDER BY name ASC";
        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get users by role
     */
    function get_by_role($role) {
        $role = db_escape($role);
        $sql = "SELECT * FROM users WHERE role = '$role' AND is_active = 1 ORDER BY name ASC";
        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get user's tasks count
     */
    function get_task_count() {
        if (!$this->id) return 0;

        $sql = "SELECT COUNT(*) as count FROM tasks WHERE assigned_to = {$this->id}";
        $result = db_query($sql);
        $row = db_fetch_row($result);
        return $row['count'];
    }

    /**
     * Get user's completed tasks count
     */
    function get_completed_task_count() {
        if (!$this->id) return 0;

        $sql = "SELECT COUNT(*) as count FROM tasks WHERE assigned_to = {$this->id} AND status = 'completed'";
        $result = db_query($sql);
        $row = db_fetch_row($result);
        return $row['count'];
    }

    /**
     * Search users
     */
    function search($query) {
        $query = db_escape($query);
        $sql = "SELECT * FROM users
                WHERE is_active = 1
                AND (name LIKE '%$query%' OR email LIKE '%$query%' OR department LIKE '%$query%')
                ORDER BY name ASC";
        $result = db_query($sql);
        return db_fetch_all($result);
    }
}
