# Greenwood School - Software Requirements Specification

## 1. Functional Requirements

FR-001 [HIGH]   Home page displays school overview and stats
FR-002 [HIGH]   About page shows history, vision, mission, principal message
FR-003 [MEDIUM] Academics page lists classes LKG-12 with CBSE details
FR-004 [MEDIUM] Activities page shows sports, arts, clubs with gallery
FR-005 [HIGH]   Admissions page shows process, eligibility, fee structure
FR-006 [HIGH]   Registration form collects and saves student data to DB
FR-007 [HIGH]   Registration validates all required fields before submit
FR-008 [HIGH]   Registration shows success/error toast notification
FR-009 [MEDIUM] Events page lists upcoming and past events from DB
FR-010 [MEDIUM] Gallery page shows photos in grid with category filter
FR-011 [HIGH]   Contact page has form that saves messages to DB
FR-012 [HIGH]   Admin login validates email/password and issues JWT
FR-013 [HIGH]   Admin dashboard shows stats: total/pending/approved/rejected
FR-014 [HIGH]   Admin can view all registrations with status badges
FR-015 [HIGH]   Admin can approve, reject, delete registrations
FR-016 [HIGH]   Admin can add, edit, delete students
FR-017 [HIGH]   Admin can add, edit, delete events
FR-018 [HIGH]   Admin can add, edit, delete gallery items
FR-019 [HIGH]   Admin can add, edit, delete staff members
FR-020 [HIGH]   All /admin routes redirect to login if no valid JWT
FR-021 [MEDIUM] Admin can search and filter registrations by name/status
FR-022 [MEDIUM] Admin can export registrations as CSV
FR-023 [LOW]    Navbar shows active page highlight
FR-024 [LOW]    Footer shows school info and quick links
FR-025 [MEDIUM] Contact form sends data to DB and shows confirmation

## 2. Non-Functional Requirements

- **Performance**: Page load < 3 seconds, API response < 300ms
- **Security**: JWT httpOnly, Prisma parameterized queries, CORS configured, rate limiting on forms
- **Responsiveness**: Works on 320px to 1920px screens
- **Accessibility**: WCAG 2.1 AA, proper ARIA labels, keyboard nav
- **SEO**: Meta tags, og tags, sitemap.xml, robots.txt
- **Reliability**: 99.9% uptime via Vercel edge network
- **Scalability**: Neon auto-scales, Vercel serverless scales to 0

## 3. Data Requirements

All tables defined in Prisma schema (see project_docs.md):
- Registration (student registration requests)
- Student (enrolled students)
- Event (school events)
- Gallery (photo gallery items)
- Staff (staff members)
- Admin (admin users)
- Contact (contact form submissions)
