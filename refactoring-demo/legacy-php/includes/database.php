<?php
/**
 * Database Connection Handler
 * Legacy PHP 5 - Using mysqli but with INSECURE patterns
 *
 * NOTE: This uses mysqli for Docker compatibility, but still demonstrates
 * all the security anti-patterns (no prepared statements, SQL injection, etc.)
 */

require_once dirname(__FILE__) . '/config.php';

// Global database connection (anti-pattern)
$GLOBALS['db_connection'] = null;

/**
 * Get database connection (creates if doesn't exist)
 */
function db_connect() {
    if ($GLOBALS['db_connection'] === null) {
        // Create connection
        $GLOBALS['db_connection'] = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

        if ($GLOBALS['db_connection']->connect_error) {
            // Error message exposes system info (Security Issue)
            die('Database connection failed: ' . $GLOBALS['db_connection']->connect_error . ' on host ' . DB_HOST);
        }

        // Set charset (utf8mb4 for full unicode support)
        $GLOBALS['db_connection']->set_charset('utf8mb4');
    }

    return $GLOBALS['db_connection'];
}

/**
 * Execute a query - NO PREPARED STATEMENTS (SQL Injection vulnerable!)
 * This is the PRIMARY security vulnerability in this application.
 *
 * NEVER build SQL queries by concatenating user input!
 */
function db_query($sql) {
    $conn = db_connect();

    if (DEBUG_MODE) {
        // Logging SQL to global array (memory leak potential)
        $GLOBALS['query_log'][] = array(
            'sql' => $sql,
            'time' => microtime(true)
        );
    }

    $result = $conn->query($sql);

    if (!$result) {
        if (DEBUG_MODE) {
            // Exposes SQL and error in debug mode (Security Issue)
            die("Query failed: " . $conn->error . "<br>SQL: " . htmlspecialchars($sql));
        }
        return false;
    }

    return $result;
}

/**
 * Fetch single row
 */
function db_fetch_row($result) {
    if ($result instanceof mysqli_result) {
        return $result->fetch_assoc();
    }
    return null;
}

/**
 * Fetch all rows into array
 */
function db_fetch_all($result) {
    $rows = array();
    if ($result instanceof mysqli_result) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }
    return $rows;
}

/**
 * Get last insert ID
 */
function db_insert_id() {
    return $GLOBALS['db_connection']->insert_id;
}

/**
 * Get number of rows
 */
function db_num_rows($result) {
    if ($result instanceof mysqli_result) {
        return $result->num_rows;
    }
    return 0;
}

/**
 * Escape string - INSUFFICIENT PROTECTION
 * Should use prepared statements instead!
 * This function gives a FALSE sense of security.
 */
function db_escape($string) {
    $conn = db_connect();
    return $conn->real_escape_string($string);
}

/**
 * Close connection
 */
function db_close() {
    if ($GLOBALS['db_connection'] !== null) {
        $GLOBALS['db_connection']->close();
        $GLOBALS['db_connection'] = null;
    }
}

// Auto-connect on include (side effect!)
db_connect();
