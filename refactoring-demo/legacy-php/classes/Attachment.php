<?php
/**
 * Attachment Class
 * Legacy PHP 5 - File attachment handling
 *
 * SECURITY WARNING: Multiple file upload vulnerabilities!
 */

require_once dirname(__FILE__) . '/../includes/database.php';
require_once dirname(__FILE__) . '/../includes/functions.php';

class Attachment {
    var $id;
    var $task_id;
    var $filename;
    var $original_name;
    var $file_size;
    var $file_type;
    var $uploaded_by;
    var $created_at;

    function Attachment($id = null) {
        if ($id !== null) {
            $this->load($id);
        }
    }

    function load($id) {
        $sql = "SELECT * FROM attachments WHERE id = $id";
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

    /**
     * Upload file
     * SECURITY ISSUES:
     * 1. Only checks extension, not MIME type
     * 2. Doesn't sanitize filename properly
     * 3. Stores in web-accessible directory
     * 4. No virus scanning
     */
    function upload($file, $task_id) {
        // Check if file was uploaded
        if (!isset($file['tmp_name']) || empty($file['tmp_name'])) {
            return array('success' => false, 'error' => 'No file uploaded');
        }

        // Check file size
        if ($file['size'] > MAX_UPLOAD_SIZE) {
            return array('success' => false, 'error' => 'File too large. Maximum size is ' . format_file_size(MAX_UPLOAD_SIZE));
        }

        // Check extension - INSUFFICIENT! Can be bypassed
        if (!is_allowed_file($file['name'])) {
            return array('success' => false, 'error' => 'File type not allowed');
        }

        // Generate filename - still vulnerable to directory traversal
        $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
        $filename = time() . '_' . generate_random_string(8) . '.' . $ext;

        // Ensure upload directory exists
        if (!is_dir(UPLOAD_DIR)) {
            mkdir(UPLOAD_DIR, 0755, true);
        }

        $destination = UPLOAD_DIR . $filename;

        // Move file - no additional security checks!
        if (move_uploaded_file($file['tmp_name'], $destination)) {
            $this->task_id = intval($task_id);
            $this->filename = $filename;
            $this->original_name = db_escape($file['name']); // User input!
            $this->file_size = $file['size'];
            $this->file_type = $file['type']; // Can be spoofed!
            $this->uploaded_by = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 0;

            if ($this->save()) {
                log_activity('file_uploaded', "Task ID: $task_id, File: {$this->original_name}");
                return array('success' => true, 'attachment' => $this);
            } else {
                // Failed to save to DB, remove file
                unlink($destination);
                return array('success' => false, 'error' => 'Failed to save attachment record');
            }
        }

        return array('success' => false, 'error' => 'Failed to upload file');
    }

    function save() {
        if ($this->id) {
            return $this->update();
        } else {
            return $this->insert();
        }
    }

    function insert() {
        $task_id = intval($this->task_id);
        $filename = db_escape($this->filename);
        $original_name = db_escape($this->original_name);
        $file_size = intval($this->file_size);
        $file_type = db_escape($this->file_type);
        $uploaded_by = intval($this->uploaded_by);

        $sql = "INSERT INTO attachments (task_id, filename, original_name, file_size, file_type, uploaded_by, created_at)
                VALUES ($task_id, '$filename', '$original_name', $file_size, '$file_type', $uploaded_by, NOW())";

        if (db_query($sql)) {
            $this->id = db_insert_id();
            return true;
        }
        return false;
    }

    function update() {
        // Attachments typically aren't updated, but keeping for completeness
        return true;
    }

    /**
     * Delete attachment
     */
    function delete() {
        if (!$this->id) return false;

        // Delete file from disk
        $filepath = UPLOAD_DIR . $this->filename;
        if (file_exists($filepath)) {
            unlink($filepath);
        }

        // Delete from database
        $sql = "DELETE FROM attachments WHERE id = {$this->id}";
        if (db_query($sql)) {
            log_activity('file_deleted', "Attachment ID: {$this->id}");
            return true;
        }
        return false;
    }

    /**
     * Get file path
     */
    function get_path() {
        return UPLOAD_DIR . $this->filename;
    }

    /**
     * Get download URL
     * SECURITY ISSUE: Direct access to uploads directory!
     */
    function get_url() {
        return APP_URL . '/uploads/' . $this->filename;
    }

    /**
     * Download file
     * SECURITY: No access control check!
     */
    function download() {
        $filepath = $this->get_path();

        if (!file_exists($filepath)) {
            die('File not found');
        }

        // Send headers
        header('Content-Type: ' . $this->file_type);
        header('Content-Disposition: attachment; filename="' . $this->original_name . '"');
        header('Content-Length: ' . filesize($filepath));
        header('Cache-Control: no-cache, must-revalidate');

        // Output file
        readfile($filepath);
        exit;
    }

    /**
     * Get attachments for task
     */
    function get_by_task($task_id) {
        $task_id = intval($task_id);
        $sql = "SELECT a.*, u.name as uploaded_by_name
                FROM attachments a
                LEFT JOIN users u ON a.uploaded_by = u.id
                WHERE a.task_id = $task_id
                ORDER BY a.created_at DESC";

        $result = db_query($sql);
        return db_fetch_all($result);
    }

    /**
     * Get total storage used by user
     */
    function get_user_storage($user_id) {
        $user_id = intval($user_id);
        $sql = "SELECT SUM(file_size) as total FROM attachments WHERE uploaded_by = $user_id";
        $result = db_query($sql);
        $row = db_fetch_row($result);
        return $row['total'] ? $row['total'] : 0;
    }
}
