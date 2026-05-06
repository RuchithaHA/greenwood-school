# Greenwood School - Requirements Document

## 1. Stakeholder Analysis

| Stakeholder | Role | Interest | Influence |
|---|---|---|---|
| School Principal | Decision maker | Full site quality | High |
| Admin Staff | Daily user | Dashboard usability | High |
| Parents | Registrant | Easy registration | Medium |
| Students | Visitor | Activities info | Low |
| Developer | Builder | Clean codebase | High |

## 2. User Personas

### Persona 1 — Parent (Priya, 38, Bangalore)
- **Goal**: Register child for Class 1 quickly
- **Pain point**: Complex forms, unclear fee structure
- **Need**: Simple form, clear process steps, confirmation

### Persona 2 — Admin Staff (Meena, 32)
- **Goal**: Manage 200+ registrations daily
- **Pain point**: Manual Excel tracking
- **Need**: Dashboard with search, filter, approve/reject buttons

### Persona 3 — Visitor (Ravi, 45)
- **Goal**: Learn about school before deciding
- **Pain point**: Finding contact and activities info
- **Need**: Clear navigation, photos, contact form

## 3. User Stories (15 stories)

US-001: As a parent, I want to fill a registration form online so that I don't need to visit the school physically
US-002: As a parent, I want form validation so I know what information is required
US-003: As a parent, I want a confirmation message after submitting so I know it was received
US-004: As an admin, I want to login securely so only I can access the dashboard
US-005: As an admin, I want to see all registrations in a table so I can process them efficiently
US-006: As an admin, I want to approve or reject registrations with one click
US-007: As an admin, I want to search registrations by student name or status
US-008: As an admin, I want to manage student records with add, edit, delete
US-009: As an admin, I want to create and manage school events so they appear on the website
US-010: As an admin, I want to manage gallery photos by album category
US-011: As a visitor, I want to see school activities and photos to judge the school quality
US-012: As a visitor, I want a contact form to ask questions without calling
US-013: As a visitor, I want to see the fee structure clearly before deciding on admission
US-014: As a visitor, I want the site to work well on my phone
US-015: As a principal, I want the site to look professional to build school reputation

## 4. Acceptance Criteria

### Registration form
- All fields validated
- Data saved to DB
- Success toast shown
- Duplicate email rejected

### Admin login
- Wrong password shows error
- Correct credentials set JWT cookie and redirect to dashboard

### Admin CRUD
- Create/Read/Update/Delete works for all 5 entities

### Responsiveness
- All pages work correctly at 375px mobile width
