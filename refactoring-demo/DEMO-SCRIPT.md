# TaskMaster Pro Refactoring Demo Script

## 🎬 Live-Coding Presentation Guide

**Total Duration**: 2 hours
**Live Coding**: ~50 minutes
**Audience**: Developers, Tech Leads, Architects

---

## Pre-Demo Checklist

```
[ ] Cursor open with project folder
[ ] Terminal ready (split panes recommended)
[ ] Node.js 18+ installed (verify: node --version)
[ ] npm 9+ installed (verify: npm --version)
[ ] Browser open for testing
[ ] BMAD docs open in tabs for reference
[ ] Backup: Pre-built version available (just in case)
```

---

## Part 1: Introduction (0:00 - 0:10)

### Opening / Talking Points

> "Today we're demonstrating the BMAD Method - Breakthrough Method for Agile AI-Driven Development - by refactoring a real legacy application.
>
> We have a PHP 5 project management app called TaskMaster Pro with over 3,600 lines of code and 15+ critical security vulnerabilities. We'll transform it into a modern TypeScript application using React and Node.js.
>
> The key difference from typical refactoring demos: we're going to BUILD the modern app live, following the BMAD methodology step by step."

### BMAD Quick Overview

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Phase 1    │ -> │  Phase 2    │ -> │  Phase 3    │ -> │  Phase 4    │
│  ANALYSIS   │    │  PLANNING   │    │ SOLUTIONING │    │IMPLEMENTATION│
│             │    │             │    │             │    │             │
│  Analyst    │    │     PM      │    │  Architect  │    │ SM + Dev    │
│  Agent      │    │   Agent     │    │   Agent     │    │  Agents     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

---

## Part 2: Phase 1 - Legacy Code Analysis (0:10 - 0:25)

### 2.1 Open the Analyst Brief

**File**: `bmad-docs/phase1-analysis/01-analyst-brief.md`

> "Let's start where BMAD starts - with analysis. The Analyst agent has audited the legacy codebase and produced this brief. Let's look at what they found."

### 2.2 Show Security Vulnerabilities (DEMO THESE!)

**SQL Injection** - Open `legacy-php/classes/User.php`:
```php
// Line 35 - Point this out!
function load($id) {
    $sql = "SELECT * FROM users WHERE id = $id";  // SQL INJECTION!
    // If I pass: "1 OR 1=1 --" I get ALL users
}
```

**Password Hashing** - Open `legacy-php/includes/functions.php`:
```php
// Line 72 - This is shocking
function hash_password($password) {
    return md5($password . 'taskmaster_salt_2015');
    // MD5 is BROKEN! Salt is HARDCODED!
    // Rainbow tables can crack this in minutes
}
```

**Hardcoded Credentials** - Open `legacy-php/includes/config.php`:
```php
// Lines 5-15 - All secrets in code!
define('DB_USER', 'taskmaster_user');
define('DB_PASS', 'tm_password_123');
define('DEBUG_MODE', true);  // Exposes SQL to users!
```

**File Upload Vulnerability** - Open `legacy-php/classes/Attachment.php`:
```php
// Only checks extension - can upload evil.php.jpg
// No MIME type check
// Uploads folder is web-accessible
// Path traversal possible
```

### 2.3 Technical Debt Summary

> "Beyond security, we have:
> - 50+ uses of deprecated mysql_* functions (removed in PHP 7!)
> - Zero type safety
> - Zero test coverage
> - 500+ lines of inline CSS/JS
> - Global state everywhere
> - No separation of concerns
> - ~3,600 lines total across 20 files"

**Transition**: "The Analyst's recommendation: full rewrite. Let's see what the PM did with this..."

---

## Part 3: Phase 2 - Requirements Planning (0:25 - 0:35)

### 3.1 Open the PRD

**File**: `bmad-docs/phase2-planning/01-prd.md`

> "The PM agent took the analyst findings and created a Product Requirements Document. This defines WHAT we're building."

### 3.2 Key Points to Cover

**Scope Decisions**:
> "Notice the PM made scope decisions. We're keeping:
> - User authentication (core feature)
> - Projects and Tasks (main functionality)
> - Dashboard with stats
>
> We're dropping (for the demo):
> - File attachments (security-sensitive, complex)
> - Time tracking (adds UI complexity)
> - Comments (scope creep)
> - Activity logging (nice to have)"

**User Stories**:
> "The PRD includes 11 user stories with acceptance criteria. Each story becomes an implementation task."

Read US-007 as an example:
```
US-007: Create Task
As a user
I want to add new tasks
So that I can track new work items

Acceptance Criteria:
- Form with title (required), description, priority, due date, project
- Priority dropdown (low, medium, high)
- Task appears in list after creation
```

**Transition**: "Now the Architect takes the requirements and designs the solution..."

---

## Part 4: Phase 3 - Architecture Design (0:35 - 0:45)

### 4.1 Open the Architecture Document

**File**: `bmad-docs/phase3-solutioning/01-architecture.md`

### 4.2 Technology Stack

> "The Architect chose this stack for specific reasons:"

| Choice | Why |
|--------|-----|
| TypeScript | Catches bugs at compile time, not runtime |
| Prisma | Eliminates SQL injection BY DESIGN |
| bcrypt | Industry-standard password hashing |
| JWT | Stateless authentication, scalable |
| Zod | Type-safe validation |
| React | Component architecture, ecosystem |
| SQLite | Zero config for demo (PostgreSQL for prod) |

### 4.3 Show Architecture Diagram

```
Client (React) --REST--> Server (Express) --Prisma--> SQLite
     |                        |
  AuthContext            Middleware
  Components             Routes → Services → Prisma
```

### 4.4 Security Controls

> "Look at how we address each legacy vulnerability:"

| Legacy Vulnerability | Modern Solution |
|---------------------|-----------------|
| SQL Injection (15+ places) | Prisma ORM - parameterized queries |
| MD5 passwords | bcrypt with cost 10 |
| Hardcoded secrets | .env files |
| No validation | Zod schemas on all inputs |
| No authorization | JWT middleware + ownership checks |

### 4.5 Prisma Schema Preview

> "The architecture doc includes the complete Prisma schema. We'll copy this during implementation."

**Transition**: "The design is done. Now we implement. Let's look at the sprint backlog..."

---

## Part 5: Phase 4 - Stories Overview (0:45 - 0:55)

### 5.1 Open the Stories Document

**File**: `bmad-docs/phase4-implementation/01-stories.md`

### 5.2 Sprint Overview

> "The Scrum Master broke down the work into 7 stories, in dependency order:"

| # | Story | Time | What We Build |
|---|-------|------|---------------|
| 1 | Setup | 10m | TypeScript monorepo |
| 2 | Database | 10m | Prisma schema + seed |
| 3 | Auth API | 15m | Register, login, JWT |
| 4 | Task API | 15m | CRUD + filtering |
| 5 | Auth UI | 15m | React pages + context |
| 6 | Dashboard | 20m | All components |
| 7 | Integration | 5m | Testing |

### 5.3 Review TASK-001 Details

> "Let's look at one story in detail. Each has:
> - Description (user story format)
> - Acceptance criteria (checkboxes)
> - Technical tasks (step-by-step)
> - Definition of Done
> - Code snippets from the Architecture doc"

**Transition**: "Alright, let's build this thing!"

---

## Part 6: Live Coding Session (0:55 - 1:45)

### TASK-001: Project Setup (10 min)

```bash
# Navigate to scaffold
cd modern-app-scaffold

# Initialize root package.json
cat > package.json << 'EOF'
{
  "name": "taskmaster-modern",
  "private": true,
  "workspaces": ["server", "client"],
  "scripts": {
    "dev": "concurrently \"npm run dev -w server\" \"npm run dev -w client\""
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
EOF
```

**Server Setup**:
```bash
cd server
npm init -y
npm install express cors dotenv
npm install -D typescript @types/express @types/node @types/cors ts-node-dev
npx tsc --init  # Configure: strict: true, outDir: ./dist
```

Create `src/index.ts`:
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Client Setup**:
```bash
cd ../client
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Test**: Start both servers, verify working.

✅ **Checkpoint**: Both servers running

---

### TASK-002: Database Schema (10 min)

```bash
cd server
npm install prisma @prisma/client
npx prisma init --datasource-provider sqlite
```

**Copy schema from Architecture doc** to `prisma/schema.prisma`

**Run migration**:
```bash
npx prisma migrate dev --name init
```

**Create seed script** - Copy from stories doc

**Seed the database**:
```bash
npx prisma db seed
```

**Verify**:
```bash
npx prisma studio
# Show: Users, Projects, Tasks with data
```

✅ **Checkpoint**: Database seeded

---

### TASK-003: Auth API (15 min)

```bash
npm install bcryptjs jsonwebtoken zod
npm install -D @types/bcryptjs @types/jsonwebtoken
```

**Create files in this order**:
1. `src/validators/schemas.ts` - Zod validation
2. `src/services/auth.ts` - Business logic (hash, verify, JWT)
3. `src/middleware/auth.ts` - JWT verification
4. `src/middleware/error.ts` - Error handling
5. `src/routes/auth.ts` - Endpoints
6. `src/app.ts` - Express setup

**Test with curl**:
```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

✅ **Checkpoint**: Auth working

---

### TASK-004: Task API (15 min)

**Create files**:
1. `src/services/tasks.ts` - CRUD + stats
2. `src/services/projects.ts` - CRUD
3. `src/routes/tasks.ts` - Endpoints with filters
4. `src/routes/projects.ts` - Endpoints

**Test**:
```bash
TOKEN="<jwt-from-login>"
curl http://localhost:3001/api/tasks \
  -H "Authorization: Bearer $TOKEN"
```

✅ **Checkpoint**: Task CRUD working

---

### TASK-005: Auth UI (15 min)

```bash
cd client
npm install react-router-dom
```

**Create files**:
1. `src/types/index.ts` - Interfaces
2. `src/api/client.ts` - Fetch wrapper
3. `src/context/AuthContext.tsx` - Auth state
4. `src/pages/Login.tsx`
5. `src/pages/Register.tsx`
6. Update `App.tsx` with Router

**Test in browser**:
- Register → Login → Redirect to dashboard

✅ **Checkpoint**: Auth flow working

---

### TASK-006: Dashboard UI (20 min)

**Create components**:
1. `Header.tsx` - User name, logout
2. `StatsCards.tsx` - 5 stat cards
3. `TaskForm.tsx` - Add task form
4. `TaskItem.tsx` - Single task row
5. `TaskList.tsx` - Task container
6. `FilterBar.tsx` - Filter dropdowns
7. `EditModal.tsx` - Edit form
8. `Dashboard.tsx` - Page composition

**Test**: Full CRUD flow in browser

✅ **Checkpoint**: Full UI working

---

### TASK-007: Integration (5 min)

**Quick Test**:
- [ ] Login with demo@example.com / demo1234
- [ ] View seeded tasks
- [ ] Create task → appears in list
- [ ] Edit task status → updates
- [ ] Delete task → removed
- [ ] Filter by status → works
- [ ] Logout → redirects

---

## Part 7: Side-by-Side Comparison (1:45 - 1:55)

### Code Comparison

**Password Hashing**:
```php
// Legacy PHP
return md5($password . 'taskmaster_salt_2015');
```
```typescript
// Modern TypeScript
return bcrypt.hash(password, 10);
```

**Database Query**:
```php
// Legacy - SQL INJECTION!
$sql = "SELECT * FROM tasks WHERE id = $id";
```
```typescript
// Modern - Prisma (safe by design)
const task = await prisma.task.findUnique({ where: { id } });
```

**Validation**:
```php
// Legacy - Manual, incomplete
if (empty($_POST['email'])) { ... }
```
```typescript
// Modern - Zod schema
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

### Architecture Comparison

| Aspect | Legacy | Modern |
|--------|--------|--------|
| Files | 20 | 25+ |
| LOC per file | 100-450 | 20-100 |
| Type Safety | ❌ | ✅ |
| SQL Injection | Vulnerable | Impossible |
| Password Security | MD5 | bcrypt |
| Testable | ❌ | ✅ |
| Separation of Concerns | ❌ | ✅ |

---

## Part 8: Q&A (1:55 - 2:00)

### Common Questions

**Q: How long would a real refactoring take?**
> "For a 3,600 line app like this, with proper testing: 2-4 weeks for a solo developer, 1-2 weeks for a small team. The BMAD documentation saves significant time on design decisions."

**Q: Why not just patch the legacy code?**
> "We could patch individual vulnerabilities, but:
> - mysql_* functions are removed in PHP 7
> - The architecture makes testing impossible
> - Every fix risks introducing new bugs
> - The cost of maintenance exceeds rewrite cost"

**Q: Can BMAD work with AI assistants?**
> "Yes! The documents are designed to be consumable by AI agents. You can feed the PRD and Architecture docs to coding assistants for implementation help."

**Q: What about data migration?**
> "Not covered today, but the Prisma schema is designed to be compatible. A migration script would:
> 1. Export from MySQL
> 2. Transform (especially password re-hashing - users need to reset)
> 3. Import to new schema"

---

## Backup Plan

If running behind or something breaks:

1. **Behind on Auth API?** - Skip to pre-built auth, focus on Task API
2. **Behind on UI?** - Show simplified single-page version
3. **Database issues?** - Use in-memory SQLite
4. **Total disaster?** - Switch to code walkthrough of pre-built version

---

## Closing

> "Today we saw BMAD in action:
> - Phase 1: Analyst identified 15+ critical vulnerabilities in 3,600 lines of legacy code
> - Phase 2: PM scoped the work and wrote detailed requirements
> - Phase 3: Architect designed a secure, modern solution
> - Phase 4: We implemented it live in under an hour
>
> The legacy code would have taken weeks to audit manually. BMAD's structured approach made it systematic and thorough.
>
> The key takeaways:
> 1. Documentation-first development prevents rework
> 2. Modern tools (Prisma, TypeScript, Zod) eliminate entire categories of bugs
> 3. Structured methodology scales from demos to enterprise projects
>
> Questions? Thank you!"

---

## 📋 Success Criteria

The demo is successful if attendees can:

1. Explain the four BMAD phases
2. Identify at least 3 security issues in legacy code
3. Understand why modern architecture is better
4. Follow a user story from requirement to code

---

*Demo script prepared using BMAD Method*
