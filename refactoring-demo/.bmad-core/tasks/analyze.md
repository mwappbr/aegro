<!-- Powered by BMAD™ Core -->

# analyze

Perform comprehensive code analysis for code review, focusing on code quality, security, and performance for TypeScript codebases.

## Inputs

```yaml
required:
  - target: '{pr_id|branch|path|file}' # Pull request ID, branch name, file path, or directory path
  - analysis_type: 'review-pr|security-audit' # Type of analysis to perform
optional:
  - focus_areas: [] # Specific areas to focus on (e.g., ['security', 'performance', 'quality'])
  - exclude_patterns: [] # Patterns to exclude from analysis
```

## Prerequisites

- Codebase is accessible (local or remote)
- TypeScript project structure is identifiable
- For PR reviews: PR is accessible via git or platform API

## Analysis Process

### 1. Code Collection

**For Pull Requests:**
- Fetch PR diff/changes
- Identify all modified files
- Get context from base branch for comparison

**For Security Audits:**
- Scan specified path or entire codebase
- Identify all TypeScript files
- Map dependencies and imports

### 2. Code Quality Analysis

**A. TypeScript-Specific Checks**
- Type safety and strict mode compliance
- Proper use of TypeScript features (generics, interfaces, types)
- Avoidance of `any` types and proper type narrowing
- Interface/type definitions quality
- Enum vs union type usage appropriateness

**B. Code Structure & Design**
- SOLID principles adherence
- DRY (Don't Repeat Yourself) violations
- Single Responsibility Principle compliance
- Proper separation of concerns
- Architecture patterns consistency

**C. Code Readability**
- Naming conventions and clarity
- Function/class complexity (cyclomatic complexity)
- Code organization and file structure
- Comment quality and necessity
- Self-documenting code assessment

**D. Best Practices**
- Error handling patterns
- Async/await vs Promise usage
- Resource management (memory leaks, unclosed resources)
- Import organization and tree-shaking opportunities
- Module boundaries and coupling

### 3. Security Analysis

**A. Common Vulnerabilities**
- SQL injection risks (if applicable)
- XSS vulnerabilities
- CSRF protection
- Authentication/authorization flaws
- Sensitive data exposure
- Insecure dependencies

**B. TypeScript-Specific Security**
- Type confusion attacks
- Prototype pollution risks
- Unsafe type assertions
- Missing input validation
- Insecure deserialization
- Hardcoded secrets or credentials

**C. Dependency Security**
- Known vulnerabilities in dependencies
- Outdated packages with security patches
- License compliance issues
- Supply chain risks

**D. Security Patterns**
- Proper use of secure defaults
- Principle of least privilege
- Defense in depth
- Secure error handling (no information leakage)

### 4. Performance Analysis

**A. Runtime Performance**
- Algorithmic complexity issues
- Unnecessary computations or loops
- Memory allocation patterns
- Event loop blocking operations
- Large bundle size contributors

**B. TypeScript Compilation**
- Type complexity affecting compile time
- Unnecessary type computations
- Module resolution performance
- Build optimization opportunities

**C. Bundle & Load Performance**
- Tree-shaking opportunities
- Code splitting possibilities
- Lazy loading opportunities
- Unused imports and dead code
- Large dependency imports

**D. Runtime Optimizations**
- Memoization opportunities
- Caching strategies
- Debouncing/throttling needs
- Async operation optimization

### 5. Checklist Execution

When `review-pr` is executed, run the `pr-checklist` to ensure comprehensive coverage:
- Verify all checklist items are addressed
- Document findings for each checklist category
- Flag any missing items

## Output Format

### For Pull Request Reviews

Generate review report using `pr-review-tmpl.yaml` template:

```yaml
review_id: '{pr_id}'
reviewer: 'Mauro (Code Review Specialist)'
review_date: '{ISO-8601 timestamp}'
target_branch: '{branch_name}'
base_branch: '{base_branch}'

summary:
  overall_status: 'APPROVE|REQUEST_CHANGES|COMMENT'
  quality_score: 0-100
  security_score: 0-100
  performance_score: 0-100
  total_files_reviewed: {count}
  total_issues: {count}
  critical_issues: {count}
  high_priority: {count}
  medium_priority: {count}
  low_priority: {count}

code_quality:
  status: 'PASS|CONCERNS|FAIL'
  findings:
    - file: '{file_path}'
      line: {line_number}
      severity: 'critical|high|medium|low'
      category: 'type-safety|structure|readability|best-practices'
      finding: '{description}'
      recommendation: '{actionable_suggestion}'
      example: '{code_snippet}'

security:
  status: 'PASS|CONCERNS|FAIL'
  vulnerabilities:
    - id: '{vuln_id}'
      file: '{file_path}'
      line: {line_number}
      severity: 'critical|high|medium|low'
      vulnerability_type: '{type}'
      description: '{detailed_description}'
      impact: '{potential_impact}'
      remediation: '{how_to_fix}'
      references: ['{url1}', '{url2}']
  dependencies:
    - package: '{package_name}'
      version: '{version}'
      vulnerability: '{vuln_description}'
      severity: '{severity}'
      fix_version: '{version}'

performance:
  status: 'PASS|CONCERNS|FAIL'
  issues:
    - file: '{file_path}'
      line: {line_number}
      severity: 'critical|high|medium|low'
      issue_type: '{type}'
      description: '{description}'
      impact: '{performance_impact}'
      recommendation: '{optimization_suggestion}'
      estimated_improvement: '{expected_gain}'

recommendations:
  must_fix:
    - priority: 'critical|high'
      action: '{action}'
      files: ['{file1}', '{file2}']
      reason: '{why_important}'
  should_fix:
    - priority: 'medium'
      action: '{action}'
      files: ['{file1}']
      reason: '{benefit}'
  nice_to_have:
    - priority: 'low'
      action: '{action}'
      files: ['{file1}']
      reason: '{improvement}'

positive_feedback:
  - file: '{file_path}'
    aspect: '{what_was_good}'
    note: '{appreciation}'

checklist_results:
  pr_checklist_status: 'COMPLETE|INCOMPLETE'
  items_checked: {count}
  items_total: {count}
  missing_items: ['{item1}', '{item2}']
```

### For Security Audits

Generate security-focused report:

```yaml
audit_id: '{audit_id}'
auditor: 'Mauro (Code Review Specialist)'
audit_date: '{ISO-8601 timestamp}'
scope: '{path_or_files_audited}'

executive_summary:
  total_vulnerabilities: {count}
  critical: {count}
  high: {count}
  medium: {count}
  low: {count}
  risk_level: 'CRITICAL|HIGH|MEDIUM|LOW'
  recommendation: '{overall_recommendation}'

vulnerabilities:
  - id: '{vuln_id}'
    severity: 'critical|high|medium|low'
    category: '{category}'
    file: '{file_path}'
    line: {line_number}
    description: '{detailed_description}'
    impact: '{potential_impact}'
    exploitability: '{how_easy_to_exploit}'
    remediation: '{how_to_fix}'
    references: ['{url1}']
    affected_code: '{code_snippet}'

dependency_scan:
  total_dependencies: {count}
  vulnerable_packages: {count}
  outdated_packages: {count}
  packages:
    - name: '{package}'
      version: '{version}'
      latest_version: '{latest}'
      vulnerabilities: ['{vuln1}']
      recommendation: '{action}'

security_patterns:
  positive_findings:
    - pattern: '{good_pattern}'
      location: '{file_path}'
      note: '{why_good}'
  missing_patterns:
    - pattern: '{missing_pattern}'
      recommendation: '{how_to_implement}'
      priority: '{priority}'

compliance:
  standards_checked: ['OWASP', 'CWE', 'TypeScript Security']
  compliance_status: 'COMPLIANT|NON_COMPLIANT|PARTIAL'
  gaps: ['{gap1}', '{gap2}']

action_plan:
  immediate:
    - action: '{action}'
      priority: 'critical|high'
      estimated_effort: '{effort}'
  short_term:
    - action: '{action}'
      priority: 'medium'
      estimated_effort: '{effort}'
  long_term:
    - action: '{action}'
      priority: 'low'
      estimated_effort: '{effort}'
```

## Key Principles

- Be thorough but practical - focus on issues that matter
- Provide actionable feedback with specific examples
- Explain the "why" behind recommendations
- Balance perfectionism with pragmatism
- Prioritize security and critical quality issues
- Acknowledge good practices and well-written code
- Use TypeScript-specific knowledge for accurate assessments

## Blocking Conditions

Stop the analysis and request clarification if:

- Target code is inaccessible
- Project structure is unclear
- Dependencies cannot be resolved
- Critical configuration is missing
- Analysis scope is ambiguous

## Completion

After analysis:

1. Generate appropriate report using template
2. Provide summary with prioritized action items
3. Offer to discuss findings or provide additional context
4. Suggest follow-up actions if needed
