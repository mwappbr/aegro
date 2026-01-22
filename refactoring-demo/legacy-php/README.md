# TaskMaster Pro - Legacy PHP Application

## ⚠️ WARNING

**This application is intentionally insecure!** It is designed to demonstrate security vulnerabilities and bad coding practices for educational purposes.

**DO NOT deploy this application to any public environment.**

---

## Running with Docker

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Quick Start

```bash
# From the legacy-php directory
cd legacy-php

# Start the application
docker-compose up -d

# Wait for MySQL to initialize (about 30 seconds)
# Then open in browser:
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Application** | http://localhost:8080 | TaskMaster Pro |
| **phpMyAdmin** | http://localhost:8081 | Database browser |

### Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@taskmaster.local | admin123 | Administrator |
| john@example.com | password123 | Regular User |
| jane@example.com | password123 | Regular User |

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes (reset database)
docker-compose down -v

# Rebuild after code changes
docker-compose up -d --build
```

---

## Security Vulnerabilities (For Demo)

This application contains the following **intentional** security issues:

### 1. SQL Injection (Critical)
- **Location**: All `load()` methods in classes
- **Example**: `User.php` line 35
- **Exploit**: `1 OR 1=1 --`

### 2. Weak Password Hashing (Critical)
- **Location**: `includes/functions.php` line 72
- **Issue**: Uses MD5 with hardcoded salt
- **Why it's bad**: MD5 is broken, rainbow tables exist

### 3. Hardcoded Credentials (High)
- **Location**: `includes/config.php`
- **Issue**: Database credentials, API keys in code
- **Why it's bad**: Exposed in version control

### 4. File Upload Vulnerabilities (High)
- **Location**: `classes/Attachment.php`
- **Issues**:
  - Extension-only validation
  - No MIME type checking
  - Uploads are web-accessible

### 5. Session Security Issues (Medium)
- **Location**: `includes/session.php`
- **Issues**:
  - No secure/httponly flags
  - Long session lifetime (7 days)
  - Session fixation possible

### 6. XSS Vulnerabilities (Medium)
- **Location**: Flash messages, user input display
- **Issue**: Unescaped output in several places

### 7. Debug Mode in Production (Low)
- **Location**: `includes/config.php`
- **Issue**: `DEBUG_MODE = true` exposes SQL queries

---

## Project Structure

```
legacy-php/
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Multi-container setup
├── database.sql           # Schema and seed data
├── index.php              # Entry point
├── login.php              # Authentication
├── register.php           # User registration
├── dashboard.php          # Main dashboard
├── tasks.php              # Task list
├── task.php               # Task detail
├── logout.php             # Session destruction
├── includes/
│   ├── config.php         # Configuration (hardcoded creds!)
│   ├── database.php       # DB connection (SQL injection!)
│   ├── functions.php      # Utilities (MD5 passwords!)
│   └── session.php        # Session handling
├── classes/
│   ├── User.php           # User model
│   ├── Task.php           # Task model
│   ├── Project.php        # Project model
│   └── Attachment.php     # File uploads (insecure!)
├── templates/
│   ├── header.php         # Page header
│   └── footer.php         # Page footer
├── api/
│   └── update_task_status.php  # AJAX endpoint
└── uploads/               # File storage
```

---

## Troubleshooting

### "Database connection failed"
Wait 30 seconds after starting containers. MySQL takes time to initialize.

```bash
# Check if MySQL is ready
docker-compose logs db
```

### "Access denied"
Make sure you're using the correct credentials from the database.sql seed data.

### Port conflicts
If ports 8080, 8081, or 3307 are in use:
```bash
# Edit docker-compose.yml to change ports
# Or stop conflicting services
```

### Reset everything
```bash
docker-compose down -v
docker-compose up -d --build
```

---

## Database Schema

The application uses 8 tables:

- `users` - User accounts
- `projects` - Project definitions
- `project_members` - Team membership
- `tasks` - Task items
- `comments` - Task comments
- `attachments` - File uploads
- `time_logs` - Time tracking
- `activity_log` - Audit trail

See `database.sql` for full schema and seed data.

---

*This legacy application is part of the BMAD Method refactoring demo.*
