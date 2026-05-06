# Greenwood School - Test Cases

| TC-ID | Type | Module | Test Steps | Expected | Status |
|-------|------|--------|------------|----------|--------|
| TC-001 | E2E | Home Page | 1. Navigate to home page<br>2. Check for hero text | Hero shows "Nurturing Minds Since 1995" | Pending |
| TC-002 | E2E | Navigation | 1. Open home page<br>2. Check navbar links | All 9 links visible on desktop | Pending |
| TC-003 | E2E | Registration | 1. Open registration page<br>2. Submit empty form | Validation errors shown | Pending |
| TC-004 | E2E | Registration | 1. Fill all registration fields<br>2. Submit | Success toast, data saved | Pending |
| TC-005 | E2E | Admin Login | 1. Open admin login<br>2. Enter wrong password | Error message shown | Pending |
| TC-006 | E2E | Admin Login | 1. Enter correct credentials<br>2. Submit | Redirect to dashboard | Pending |
| TC-007 | E2E | Admin Dashboard | 1. Login as admin<br>2. View dashboard | 4 stat cards visible | Pending |
| TC-008 | E2E | Admin Registrations | 1. Open registrations page<br>2. Check table | Data rows displayed | Pending |
| TC-009 | E2E | Admin Approve | 1. Click approve button<br>2. Check status | Status changes to Approved | Pending |
| TC-010 | E2E | Gallery | 1. Open gallery page<br>2. Check images | Images shown in grid | Pending |
| TC-011 | E2E | Contact | 1. Fill contact form<br>2. Submit | Success toast shown | Pending |
| TC-012 | E2E | Mobile | 1. Resize to 375px<br>2. Test hamburger menu | Menu opens/closes | Pending |
| TC-013 | E2E | Events | 1. Open events page<br>2. Check event cards | Events displayed | Pending |
| TC-014 | E2E | About | 1. Open about page<br>2. Check principal section | Principal message visible | Pending |
| TC-015 | E2E | Footer | 1. Scroll to footer<br>2. Check contact info | Contact info displayed | Pending |
| TC-016 | Unit | API - Registrations | POST /api/registrations with valid data | 201 status, record created | Pending |
| TC-017 | Unit | API - Registrations | POST with missing fields | 400 status, error message | Pending |
| TC-018 | Unit | API - Registrations | POST with duplicate email | 400 status, duplicate error | Pending |
| TC-019 | Unit | API - Auth Login | POST with wrong password | 401 status | Pending |
| TC-020 | Unit | API - Events | GET /api/events | 200 status, array returned | Pending |
