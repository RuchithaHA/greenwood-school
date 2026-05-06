# Greenwood School - Use Cases

| UC-ID | Actor | Precondition | Steps | Expected Result |
|-------|-------|--------------|-------|-----------------|
| UC-001 | Parent | User on registration page | 1. Fill all required fields<br>2. Click submit | Registration saved to DB, success toast shown |
| UC-002 | Parent | User on registration page | 1. Submit empty form<br>2. View error messages | Inline validation errors shown for all required fields |
| UC-003 | Parent | User on registration page | 1. Fill form with existing email<br>2. Click submit | Error toast: "This email is already registered" |
| UC-004 | Admin | User on admin login page | 1. Enter correct email/password<br>2. Click login | JWT cookie set, redirected to dashboard |
| UC-005 | Admin | User on admin login page | 1. Enter wrong password<br>2. Click login | Error message: "Invalid email or password" |
| UC-006 | Admin | User on admin dashboard | 1. View stats cards<br>2. View recent registrations | Stats display correct counts, table shows recent data |
| UC-007 | Admin | User on registrations page | 1. Click Approve on pending registration | Status changes to "Approved", toast success shown |
| UC-008 | Admin | User on registrations page | 1. Click Reject on pending registration | Status changes to "Rejected", toast success shown |
| UC-009 | Admin | User on registrations page | 1. Enter search term<br>2. View filtered table | Table shows only matching registrations |
| UC-010 | Admin | User on students page | 1. Click Add Student<br>2. Fill form<br>3. Submit | New student created, added to table |
| UC-011 | Admin | User on events page | 1. Click Add Event<br>2. Fill form<br>3. Submit | New event created, appears on events page |
| UC-012 | Admin | User on gallery page | 1. Click Add Gallery Item<br>2. Fill form<br>3. Submit | New gallery item created, appears on gallery page |
| UC-013 | Admin | User on staff page | 1. Click Add Staff<br>2. Fill form<br>3. Submit | New staff member created, added to table |
| UC-014 | Visitor | User on gallery page | 1. Click category filter<br>2. View filtered images | Grid shows only images from selected category |
| UC-015 | Visitor | User on contact page | 1. Fill contact form<br>2. Click submit | Message saved to DB, success toast shown |
