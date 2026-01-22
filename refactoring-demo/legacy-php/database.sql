-- =============================================================================
-- TaskMaster Pro - Legacy Database Schema
-- MySQL Database for PHP 5 Application
--
-- SCHEMA ISSUES FOR DEMO:
-- 1. No foreign key constraints
-- 2. Missing indexes on frequently queried columns
-- 3. VARCHAR(100) for password (too short for modern hashes)
-- 4. No default values for some columns
-- 5. TEXT fields where VARCHAR would be more appropriate
-- =============================================================================

-- Database is created by Docker, just use it
USE taskmaster;

-- -----------------------------------------------------------------------------
-- Users Table
-- -----------------------------------------------------------------------------
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,  -- MD5 hash (32 chars) - INSECURE!
    name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'manager', 'user') DEFAULT 'user',
    avatar VARCHAR(255),
    department VARCHAR(100),
    phone VARCHAR(50),
    is_active TINYINT(1) DEFAULT 1,
    last_login DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    UNIQUE KEY unique_email (email)
    -- Missing: index on role, is_active for filtering
);

-- -----------------------------------------------------------------------------
-- Projects Table
-- -----------------------------------------------------------------------------
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    status ENUM('active', 'on_hold', 'completed', 'cancelled') DEFAULT 'active',
    owner_id INT NOT NULL,  -- No foreign key!
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2) DEFAULT 0,
    color VARCHAR(7) DEFAULT '#3498db',
    created_at DATETIME,
    updated_at DATETIME
    -- Missing: INDEX on owner_id, status
);

-- -----------------------------------------------------------------------------
-- Project Members (Join Table)
-- -----------------------------------------------------------------------------
CREATE TABLE project_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,  -- No FK
    user_id INT NOT NULL,     -- No FK
    role ENUM('lead', 'member', 'viewer') DEFAULT 'member',
    joined_at DATETIME,
    UNIQUE KEY unique_membership (project_id, user_id)
    -- Missing: indexes
);

-- -----------------------------------------------------------------------------
-- Tasks Table
-- -----------------------------------------------------------------------------
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,           -- No FK, nullable
    title VARCHAR(200) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    status ENUM('pending', 'in_progress', 'review', 'completed', 'cancelled') DEFAULT 'pending',
    assigned_to INT,          -- No FK
    created_by INT NOT NULL,  -- No FK
    due_date DATE,
    estimated_hours DECIMAL(5, 2) DEFAULT 0,
    actual_hours DECIMAL(5, 2) DEFAULT 0,
    tags VARCHAR(500),        -- Comma-separated, should be separate table!
    created_at DATETIME,
    updated_at DATETIME,
    completed_at DATETIME
    -- Missing: indexes on project_id, assigned_to, status, due_date
);

-- -----------------------------------------------------------------------------
-- Comments Table
-- -----------------------------------------------------------------------------
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,     -- No FK
    user_id INT,              -- No FK, nullable for system comments
    content TEXT NOT NULL,
    type ENUM('user', 'system') DEFAULT 'user',
    created_at DATETIME
    -- Missing: index on task_id
);

-- -----------------------------------------------------------------------------
-- Attachments Table
-- -----------------------------------------------------------------------------
CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,     -- No FK
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_size INT NOT NULL,
    file_type VARCHAR(100),
    uploaded_by INT,          -- No FK
    created_at DATETIME
    -- Missing: index on task_id
);

-- -----------------------------------------------------------------------------
-- Time Logs Table
-- -----------------------------------------------------------------------------
CREATE TABLE time_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT NOT NULL,     -- No FK
    user_id INT NOT NULL,     -- No FK
    hours DECIMAL(5, 2) NOT NULL,
    description VARCHAR(500),
    logged_at DATETIME
    -- Missing: indexes
);

-- -----------------------------------------------------------------------------
-- Activity Log Table
-- -----------------------------------------------------------------------------
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,              -- No FK
    action VARCHAR(100) NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    created_at DATETIME
    -- Missing: index on user_id, created_at
    -- Note: This table will grow unbounded - no archiving strategy!
);

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Insert admin user (password: admin123, MD5 hashed with salt)
INSERT INTO users (email, password, name, role, department, is_active, created_at) VALUES
('admin@taskmaster.com', '6b3656d6644041e182052d3a1677f7fd', 'Admin User', 'admin', 'IT', 1, NOW());
-- MD5 of 'admin123taskmaster_salt_2015'

-- Insert regular users (password: password)
INSERT INTO users (email, password, name, role, department, phone, is_active, created_at) VALUES
('john@example.com', '558a2871cdfadc042f499cab3edbafe8', 'John Smith', 'user', 'Engineering', '+1 555-0101', 1, NOW()),
('jane@example.com', '558a2871cdfadc042f499cab3edbafe8', 'Jane Doe', 'manager', 'Product', '+1 555-0102', 1, NOW()),
('bob@example.com', '558a2871cdfadc042f499cab3edbafe8', 'Bob Wilson', 'user', 'Design', '+1 555-0103', 1, NOW()),
('alice@example.com', '558a2871cdfadc042f499cab3edbafe8', 'Alice Brown', 'user', 'Engineering', '+1 555-0104', 1, NOW());
-- Password for all: 'password' (MD5 hashed with salt: passwordtaskmaster_salt_2015)

-- Insert sample projects
INSERT INTO projects (name, description, status, owner_id, start_date, end_date, budget, color, created_at) VALUES
('Website Redesign', 'Complete overhaul of the company website with modern design', 'active', 2, '2024-01-01', '2024-06-30', 50000.00, '#3498db', NOW()),
('Mobile App Development', 'Native iOS and Android app for customers', 'active', 3, '2024-02-01', '2024-12-31', 150000.00, '#e74c3c', NOW()),
('Internal Tools', 'Build internal productivity tools', 'active', 1, '2024-01-15', '2024-05-31', 25000.00, '#2ecc71', NOW()),
('Q1 Marketing Campaign', 'Digital marketing campaign for Q1 2024', 'completed', 3, '2024-01-01', '2024-03-31', 30000.00, '#9b59b6', NOW());

-- Add project members
INSERT INTO project_members (project_id, user_id, role, joined_at) VALUES
(1, 2, 'lead', NOW()),
(1, 4, 'member', NOW()),
(1, 5, 'member', NOW()),
(2, 3, 'lead', NOW()),
(2, 2, 'member', NOW()),
(3, 1, 'lead', NOW()),
(3, 2, 'member', NOW()),
(3, 4, 'member', NOW());

-- Insert sample tasks
INSERT INTO tasks (project_id, title, description, priority, status, assigned_to, created_by, due_date, estimated_hours, tags, created_at) VALUES
-- Website Redesign tasks
(1, 'Design homepage mockup', 'Create modern, responsive homepage design with hero section', 'high', 'completed', 4, 2, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 16, 'design,ui,homepage', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(1, 'Implement responsive navigation', 'Build mobile-friendly navigation menu with hamburger icon', 'high', 'in_progress', 5, 2, CURDATE(), 8, 'frontend,css,mobile', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(1, 'Setup CI/CD pipeline', 'Configure GitHub Actions for automated deployment', 'medium', 'pending', 2, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), 4, 'devops,automation', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(1, 'Write unit tests for API', 'Add comprehensive test coverage for all API endpoints', 'medium', 'pending', 5, 2, DATE_ADD(CURDATE(), INTERVAL 7 DAY), 12, 'testing,backend', NOW()),
(1, 'Optimize images', 'Compress and convert images to WebP format', 'low', 'pending', 4, 2, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 3, 'performance,images', NOW()),

-- Mobile App tasks
(2, 'Setup React Native project', 'Initialize project with TypeScript and navigation', 'critical', 'completed', 2, 3, DATE_SUB(CURDATE(), INTERVAL 10 DAY), 8, 'mobile,react-native,setup', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(2, 'Implement authentication flow', 'Login, register, forgot password screens', 'high', 'in_progress', 2, 3, DATE_ADD(CURDATE(), INTERVAL 2 DAY), 24, 'auth,security,mobile', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'Design app icon and splash screen', 'Create branded assets for app stores', 'medium', 'review', 4, 3, CURDATE(), 6, 'design,branding', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(2, 'Integrate push notifications', 'Setup Firebase Cloud Messaging', 'high', 'pending', 2, 3, DATE_ADD(CURDATE(), INTERVAL 14 DAY), 12, 'mobile,notifications,firebase', NOW()),

-- Internal Tools tasks
(3, 'Build employee directory', 'Searchable directory with filters', 'medium', 'completed', 2, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 16, 'internal,directory', DATE_SUB(NOW(), INTERVAL 21 DAY)),
(3, 'Add time tracking feature', 'Allow employees to log hours on projects', 'high', 'in_progress', 4, 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), 20, 'timetracking,feature', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(3, 'Create reporting dashboard', 'Management dashboard with KPIs', 'medium', 'pending', 5, 1, DATE_ADD(CURDATE(), INTERVAL 21 DAY), 32, 'reporting,analytics,dashboard', NOW()),

-- Tasks without project (personal)
(NULL, 'Review pull requests', 'Go through pending PRs from team', 'high', 'pending', 2, 2, CURDATE(), 2, 'review,code', NOW()),
(NULL, 'Update documentation', 'Update README and API docs', 'low', 'pending', 2, 2, DATE_ADD(CURDATE(), INTERVAL 7 DAY), 4, 'docs', NOW()),

-- Overdue tasks for demo
(1, 'Fix critical security bug', 'Patch SQL injection vulnerability in login', 'critical', 'pending', 2, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 4, 'security,bug,urgent', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'Submit app store listing', 'Prepare metadata and screenshots', 'high', 'pending', 3, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 3, 'appstore,release', DATE_SUB(NOW(), INTERVAL 10 DAY));

-- Add some comments
INSERT INTO comments (task_id, user_id, content, type, created_at) VALUES
(1, 2, 'Looks great! Just need to adjust the color scheme slightly.', 'user', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(1, 4, 'Updated colors based on brand guidelines. Ready for review.', 'user', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(1, NULL, 'Status changed from ''in_progress'' to ''completed''', 'system', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 2, 'Using Bootstrap 5 for the responsive grid. Any concerns?', 'user', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(2, 5, 'Sounds good. Make sure to test on older Safari versions.', 'user', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(7, 3, 'Please prioritize biometric login for iOS.', 'user', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(7, 2, 'Added Face ID support. Working on Android fingerprint now.', 'user', DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Add time logs
INSERT INTO time_logs (task_id, user_id, hours, description, logged_at) VALUES
(1, 4, 4.5, 'Initial wireframes', DATE_SUB(NOW(), INTERVAL 12 DAY)),
(1, 4, 6.0, 'High-fidelity mockups', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(1, 4, 3.5, 'Revisions and finalization', DATE_SUB(NOW(), INTERVAL 6 DAY)),
(2, 5, 2.0, 'Navigation structure', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 5, 3.5, 'Mobile menu implementation', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(6, 2, 4.0, 'Project setup and configuration', DATE_SUB(NOW(), INTERVAL 18 DAY)),
(6, 2, 4.0, 'TypeScript config and dependencies', DATE_SUB(NOW(), INTERVAL 17 DAY)),
(7, 2, 8.0, 'Login and register screens', DATE_SUB(NOW(), INTERVAL 4 DAY)),
(7, 2, 6.0, 'Auth state management', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(10, 2, 8.0, 'Backend API development', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(10, 2, 6.0, 'Frontend implementation', DATE_SUB(NOW(), INTERVAL 10 DAY));

-- Add activity log entries
INSERT INTO activity_log (user_id, action, details, ip_address, created_at) VALUES
(1, 'login_success', 'User: admin@taskmaster.com', '192.168.1.1', DATE_SUB(NOW(), INTERVAL 1 HOUR)),
(2, 'task_created', 'Task ID: 15, Title: Fix critical security bug', '192.168.1.10', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(2, 'login_success', 'User: john@example.com', '192.168.1.10', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(4, 'task_updated', 'Task ID: 1', '192.168.1.15', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(3, 'project_created', 'Project ID: 4', '192.168.1.20', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(2, 'file_uploaded', 'Task ID: 1, File: homepage_v2.png', '192.168.1.10', DATE_SUB(NOW(), INTERVAL 6 DAY));

-- =============================================================================
-- End of Schema
-- =============================================================================
