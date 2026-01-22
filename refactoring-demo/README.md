# TaskMaster Pro: Legacy to Modern Refactoring Demo

## 🎯 BMAD Method Live-Coding Demonstration

This demo showcases the **BMAD (Breakthrough Method for Agile AI-Driven Development)** approach to refactoring a legacy PHP 5 project management application into a modern TypeScript/React/Node.js stack.

**Demo Duration**: 2 hours (including ~90 minutes live coding)

---

## 📁 Project Structure

```
refactoring-demo/
├── README.md                    # This file - Demo overview
├── DEMO-SCRIPT.md              # Presentation script with talking points
│
├── legacy-php/                  # 🔴 Legacy PHP 5 Application (~3,600 lines)
│   ├── includes/               # Core infrastructure
│   │   ├── config.php         # Hardcoded credentials, debug mode
│   │   ├── database.php       # Deprecated mysql_* functions
│   │   ├── functions.php      # MD5 passwords, weak random
│   │   └── session.php        # Insecure session handling
│   ├── classes/               # Data models with SQL injection
│   │   ├── User.php          # ~200 lines
│   │   ├── Task.php          # ~300 lines
│   │   ├── Project.php       # ~250 lines
│   │   └── Attachment.php    # ~150 lines, upload vulnerabilities
│   ├── templates/            # Header/footer with 500+ lines inline CSS/JS
│   ├── api/                  # AJAX endpoints
│   ├── *.php                 # Page files (login, dashboard, tasks, etc.)
│   └── database.sql          # MySQL schema with 8 tables + seed data
│
├── modern-app-scaffold/         # 🟢 Empty Structure (YOU BUILD THIS!)
│   ├── README.md              # Implementation guide
│   ├── server/               # Backend scaffolding
│   │   ├── src/
│   │   │   ├── routes/       # Express route handlers
│   │   │   ├── middleware/   # Auth, error handling
│   │   │   ├── services/     # Business logic
│   │   │   ├── validators/   # Zod schemas
│   │   │   └── types/        # TypeScript interfaces
│   │   └── prisma/           # Database schema
│   └── client/               # Frontend scaffolding
│       └── src/
│           ├── api/          # API client
│           ├── context/      # React Context
│           ├── components/   # UI components
│           ├── pages/        # Route pages
│           └── types/        # Frontend types
│
└── bmad-docs/                   # 📋 BMAD Documentation (Your Guide)
    ├── phase1-analysis/        # Analyst findings
    │   ├── 01-analyst-brief.md # Security audit, tech debt
    │   └── 02-legacy-code-audit.md
    ├── phase2-planning/        # PM deliverables
    │   └── 01-prd.md          # Requirements, user stories
    ├── phase3-solutioning/     # Architect deliverables
    │   └── 01-architecture.md # Tech stack, API design, schemas
    └── phase4-implementation/  # Developer guide
        └── 01-stories.md      # Sprint backlog with tasks
```

---

## 🚀 Demo Approach: Live Coding

This demo is designed for **live implementation**. You will:

1. **Review** the legacy PHP code and BMAD documentation
2. **Build** the modern application from scratch following the stories
3. **Compare** the solutions side-by-side

The `modern-app-scaffold/` folder contains only the directory structure. You fill in the implementation during the demo by following the BMAD Phase 4 stories.

---

## 📖 Demo Agenda (2 Hours)

| Time | Phase | Activity |
|------|-------|----------|
| 0:00-0:10 | Intro | BMAD overview, demo goals |
| 0:10-0:25 | Phase 1 | Legacy code audit walkthrough |
| 0:25-0:35 | Phase 2 | PRD and requirements review |
| 0:35-0:45 | Phase 3 | Architecture design discussion |
| 0:45-0:55 | Phase 4 | Stories overview, implementation plan |
| 0:55-1:45 | **Live Coding** | Build the modern app (7 stories) |
| 1:45-1:55 | Demo | Run both apps, compare |
| 1:55-2:00 | Q&A | Questions and discussion |

---

## 🔍 Legacy Application: Key Issues

### Security Vulnerabilities (15+ Critical)

| Category | Issue | Location |
|----------|-------|----------|
| SQL Injection | Direct variable interpolation | `User.php:35`, `Task.php:25`, all `load()` methods |
| Authentication | MD5 + hardcoded salt | `functions.php:72` |
| File Upload | Extension-only validation | `Attachment.php` |
| Session | Missing security flags | `session.php` |
| Authorization | No access control | Tasks can be viewed/modified by anyone |
| XSS | Unescaped output | Flash messages, user input |
| Credentials | Hardcoded in code | `config.php` |

### Technical Debt

| Metric | Value |
|--------|-------|
| Total Lines | ~3,600 |
| Deprecated Functions | 50+ (`mysql_*`) |
| Type Hints | 0% |
| Test Coverage | 0% |
| Inline CSS/JS | 500+ lines |

### Features in Legacy App

- User authentication (register, login, profiles)
- Project management (CRUD, team membership)
- Task management (CRUD, status workflow, assignment)
- Comments on tasks
- File attachments
- Time tracking
- Activity logging
- Dashboard with statistics

---

## 🎯 Modern Application: Target Architecture

### Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Backend | Node.js 20 + Express + TypeScript |
| ORM | Prisma (SQLite for demo, PostgreSQL for production) |
| Auth | JWT + bcrypt |
| Validation | Zod |

### Security Improvements

| Legacy Problem | Modern Solution |
|----------------|-----------------|
| SQL Injection | Prisma ORM (parameterized) |
| MD5 Passwords | bcrypt (cost 10) |
| Hardcoded Secrets | Environment variables |
| No Validation | Zod schemas |
| No Authorization | JWT middleware + ownership checks |

### In Scope for Demo

- ✅ User authentication (register, login, logout)
- ✅ Project CRUD
- ✅ Task CRUD with status workflow
- ✅ Dashboard with statistics
- ✅ Filtering and sorting

### Out of Scope (Time Constraints)

- ❌ File attachments
- ❌ Time tracking
- ❌ Comments
- ❌ Activity logging
- ❌ Email notifications

---

## 🛠️ Implementation Stories (Phase 4)

| Story | Title | Time | Description |
|-------|-------|------|-------------|
| TASK-001 | Project Setup | 10 min | Monorepo, TypeScript, Tailwind |
| TASK-002 | Database Schema | 10 min | Prisma models, migrations, seed |
| TASK-003 | Auth API | 15 min | Register, login, JWT middleware |
| TASK-004 | Task API | 15 min | CRUD endpoints, filtering |
| TASK-005 | Auth UI | 15 min | Login, Register, AuthContext |
| TASK-006 | Dashboard UI | 20 min | Components, state management |
| TASK-007 | Integration | 5 min | Testing, bug fixes |

See `bmad-docs/phase4-implementation/01-stories.md` for detailed acceptance criteria and code snippets.

---

## 📂 Key Files to Review

### Legacy Code Issues (Show These!)
1. `legacy-php/includes/functions.php` - Line 72: MD5 password hashing
2. `legacy-php/classes/User.php` - Line 35: SQL injection
3. `legacy-php/classes/Task.php` - Line 25: SQL injection
4. `legacy-php/includes/config.php` - Hardcoded credentials
5. `legacy-php/classes/Attachment.php` - File upload vulnerabilities

### BMAD Documentation (Your Implementation Guide)
1. `bmad-docs/phase1-analysis/01-analyst-brief.md` - Security findings
2. `bmad-docs/phase2-planning/01-prd.md` - Requirements
3. `bmad-docs/phase3-solutioning/01-architecture.md` - Tech design
4. `bmad-docs/phase4-implementation/01-stories.md` - Sprint backlog

---

## 🎓 Learning Outcomes

After this demo, participants will understand:

1. **BMAD Methodology**
   - Four phases: Analysis → Planning → Solutioning → Implementation
   - Agent roles: Analyst, PM, Architect, Scrum Master, Developer
   - Artifact-driven development

2. **Legacy Code Assessment**
   - Identifying security vulnerabilities
   - Documenting technical debt
   - Planning migration strategies

3. **Modern Architecture**
   - API-first design with TypeScript
   - Separation of concerns
   - Type-safe development with Prisma and Zod
   - Component-based UI with React

4. **Security Best Practices**
   - Password hashing with bcrypt
   - JWT authentication
   - Input validation
   - Authorization checks

---

## 🐳 Running the Legacy App (Docker)

### Prerequisites
- Docker Desktop installed and running
- Docker Compose installed

### Quick Start

```bash
# Navigate to legacy app
cd legacy-php

# Start the containers
docker-compose up -d

# Wait ~30 seconds for MySQL to initialize
# Then open in browser:
```

### Access Points

| Service | URL | Description |
|---------|-----|-------------|
| **Legacy App** | http://localhost:8080 | TaskMaster Pro PHP app |
| **phpMyAdmin** | http://localhost:8081 | Database browser |

### Demo Credentials

| Email | Password |
|-------|----------|
| admin@taskmaster.local | admin123 |
| john@example.com | password123 |
| jane@example.com | password123 |

### Docker Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Reset database
docker-compose down -v && docker-compose up -d
```

---

## ⚠️ Important Notes

- The legacy PHP code is **intentionally insecure** for demonstration
- Do **NOT** deploy the legacy code to any public environment
- The modern app scaffold is **empty** - you build it during the demo
- Pre-seeded demo credentials listed above

---

## 📎 Additional Resources

- [BMAD Method Documentation](https://github.com/bmad-code-org/BMAD-METHOD)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Zod Documentation](https://zod.dev)

---

*Created using the BMAD Method for AI-Driven Development*
