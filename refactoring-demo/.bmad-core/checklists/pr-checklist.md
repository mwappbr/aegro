<!-- Powered by BMAD™ Core -->

# Pull Request Review Checklist

## Instructions for Code Review Agent

This checklist ensures comprehensive code review coverage for TypeScript pull requests. Go through each section systematically and document findings.

[[LLM: INITIALIZATION INSTRUCTIONS - PR REVIEW CHECKLIST

This checklist is for CODE REVIEW AGENTS to systematically review pull requests.

IMPORTANT: This is a comprehensive review checklist. Mark items as [x] Reviewed, [ ] Issues Found, or [N/A] Not Applicable. For items with issues, provide specific details in the review report.

EXECUTION APPROACH:

1. Go through each section systematically
2. Mark items as [x] Reviewed (no issues), [ ] Issues Found (with details), or [N/A] Not Applicable
3. Document specific findings with file paths, line numbers, and recommendations
4. Prioritize issues by severity (critical, high, medium, low)
5. Provide actionable feedback for each issue

The goal is thorough review that improves code quality, security, and performance.]]

## Checklist Items

### 1. Code Quality

[[LLM: Assess overall code quality, structure, and maintainability]]

- [ ] **TypeScript Best Practices**
  - [ ] Proper use of types (no unnecessary `any`)
  - [ ] Type safety maintained throughout
  - [ ] Interfaces/types are well-defined
  - [ ] Generics used appropriately
  - [ ] Type narrowing implemented correctly
  - [ ] Strict mode compliance

- [ ] **Code Structure**
  - [ ] SOLID principles followed
  - [ ] DRY principle (no code duplication)
  - [ ] Single Responsibility Principle
  - [ ] Proper separation of concerns
  - [ ] Appropriate design patterns used

- [ ] **Readability & Maintainability**
  - [ ] Clear and descriptive naming
  - [ ] Functions/classes are appropriately sized
  - [ ] Code is well-organized
  - [ ] Comments are meaningful (when needed)
  - [ ] Code is self-documenting

- [ ] **Error Handling**
  - [ ] Proper error handling implemented
  - [ ] Error messages are clear and helpful
  - [ ] No silent failures
  - [ ] Appropriate error types used

### 2. Security

[[LLM: Security is critical. Be thorough in identifying vulnerabilities]]

- [ ] **Input Validation**
  - [ ] All user inputs are validated
  - [ ] Type validation for TypeScript
  - [ ] Sanitization where needed
  - [ ] No trust in client-side validation alone

- [ ] **Authentication & Authorization**
  - [ ] Proper authentication checks
  - [ ] Authorization verified at appropriate levels
  - [ ] No privilege escalation risks
  - [ ] Session management is secure

- [ ] **Data Protection**
  - [ ] Sensitive data is protected
  - [ ] No hardcoded secrets or credentials
  - [ ] Proper encryption for sensitive data
  - [ ] No sensitive data in logs

- [ ] **Common Vulnerabilities**
  - [ ] SQL injection risks (if applicable)
  - [ ] XSS vulnerabilities
  - [ ] CSRF protection
  - [ ] Prototype pollution risks
  - [ ] Type confusion vulnerabilities

- [ ] **Dependencies**
  - [ ] No known vulnerabilities in dependencies
  - [ ] Dependencies are up to date
  - [ ] License compliance checked
  - [ ] Supply chain security considered

### 3. Performance

[[LLM: Identify performance bottlenecks and optimization opportunities]]

- [ ] **Algorithm Efficiency**
  - [ ] Appropriate algorithmic complexity
  - [ ] No unnecessary computations
  - [ ] Efficient data structures used
  - [ ] No performance anti-patterns

- [ ] **Memory Management**
  - [ ] No memory leaks
  - [ ] Proper resource cleanup
  - [ ] Efficient memory usage
  - [ ] No unnecessary object creation

- [ ] **Async Operations**
  - [ ] Proper async/await usage
  - [ ] No blocking operations
  - [ ] Appropriate use of Promises
  - [ ] Error handling in async code

- [ ] **Bundle & Load Performance**
  - [ ] Tree-shaking opportunities considered
  - [ ] Code splitting where appropriate
  - [ ] Lazy loading implemented if needed
  - [ ] No unnecessary large imports

- [ ] **Runtime Performance**
  - [ ] Memoization used where beneficial
  - [ ] Caching strategies appropriate
  - [ ] Debouncing/throttling where needed
  - [ ] Efficient rendering (if applicable)

### 4. Testing

[[LLM: Verify adequate test coverage and quality]]

- [ ] **Test Coverage**
  - [ ] Adequate unit test coverage
  - [ ] Integration tests where needed
  - [ ] Edge cases are tested
  - [ ] Error scenarios are tested

- [ ] **Test Quality**
  - [ ] Tests are well-written and maintainable
  - [ ] Tests are independent and isolated
  - [ ] Test names are descriptive
  - [ ] Appropriate use of mocks/stubs

- [ ] **Test Execution**
  - [ ] All tests pass
  - [ ] Tests run in reasonable time
  - [ ] No flaky tests
  - [ ] Test setup is correct

### 5. Documentation

[[LLM: Check if documentation is adequate]]

- [ ] **Code Documentation**
  - [ ] Complex logic is documented
  - [ ] Public APIs have documentation
  - [ ] Type definitions are clear
  - [ ] JSDoc/TSDoc where appropriate

- [ ] **Change Documentation**
  - [ ] PR description is clear
  - [ ] Breaking changes are documented
  - [ ] Migration guides if needed
  - [ ] Changelog updated if applicable

### 6. Standards & Conventions

[[LLM: Verify adherence to project standards]]

- [ ] **Coding Standards**
  - [ ] Follows project coding standards
  - [ ] Consistent code style
  - [ ] Linting passes
  - [ ] Formatting is consistent

- [ ] **Project Structure**
  - [ ] Files in correct locations
  - [ ] Naming conventions followed
  - [ ] Import organization
  - [ ] Module boundaries respected

- [ ] **Git Practices**
  - [ ] Meaningful commit messages
  - [ ] Logical commit grouping
  - [ ] No unnecessary files committed
  - [ ] Branch naming appropriate

### 7. Functionality

[[LLM: Verify the code works as intended]]

- [ ] **Requirements Met**
  - [ ] All requirements are implemented
  - [ ] Acceptance criteria met
  - [ ] Edge cases handled
  - [ ] Error cases handled

- [ ] **Integration**
  - [ ] Changes integrate properly
  - [ ] No breaking changes (unless intended)
  - [ ] Backward compatibility maintained
  - [ ] API contracts respected

- [ ] **User Experience**
  - [ ] UI/UX is appropriate (if applicable)
  - [ ] Error messages are user-friendly
  - [ ] Loading states handled (if applicable)
  - [ ] Accessibility considered (if applicable)

## Review Summary

[[LLM: FINAL REVIEW SUMMARY

After completing the checklist:

1. Summarize overall review findings
2. List critical issues that must be addressed
3. List high-priority issues that should be addressed
4. List medium/low priority suggestions
5. Highlight positive aspects of the code
6. Provide overall recommendation (APPROVE, REQUEST_CHANGES, COMMENT)
7. Note any follow-up items or discussions needed

Be thorough but constructive - help the developer improve while acknowledging good work.]]

### Overall Assessment

- [ ] Code Quality: [PASS|CONCERNS|FAIL]
- [ ] Security: [PASS|CONCERNS|FAIL]
- [ ] Performance: [PASS|CONCERNS|FAIL]
- [ ] Testing: [PASS|CONCERNS|FAIL]
- [ ] Documentation: [PASS|CONCERNS|FAIL]
- [ ] Standards: [PASS|CONCERNS|FAIL]
- [ ] Functionality: [PASS|CONCERNS|FAIL]

### Recommendation

- [ ] **APPROVE** - Code is ready to merge
- [ ] **REQUEST_CHANGES** - Critical issues must be addressed
- [ ] **COMMENT** - Suggestions provided, but not blocking

### Critical Issues (Must Fix)

[List critical issues that must be addressed before merge]

### High Priority Issues (Should Fix)

[List high priority issues that should be addressed]

### Suggestions (Nice to Have)

[List suggestions for improvement]

### Positive Feedback

[Highlight what was done well]
