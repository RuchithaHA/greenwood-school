# Greenwood School - Project Planning Document

## 1. Project Scope

### IN SCOPE
- 9 public pages (Home, About, Academics, Activities, Admissions, Registration, Events, Gallery, Contact)
- Working registration form saving to PostgreSQL
- Admin dashboard with CRUD for 5 entities (registrations, students, events, gallery, staff)
- JWT authentication for admin
- Fully responsive mobile-first design
- CI/CD pipeline via GitHub + Vercel

### OUT OF SCOPE
- Mobile app
- Payment gateway
- Online exam system
- Learning Management System
- SMS notifications
- Multi-language support

## 2. Goals & Feasibility

### Goals
- Provide online presence for Greenwood School
- Enable online student registration
- Allow admin to manage all school data
- Achieve Lighthouse score > 90

### Feasibility
- **Technical**: Next.js + Neon PostgreSQL proven stack
- **Timeline**: Automated generation in single session
- **Cost**: ₹0 (Vercel free + Neon free + GitHub free)

## 3. Risk Identification

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| DB connection failure | Low | High | Connection pooling + retry logic |
| Form spam/abuse | Medium | Medium | Rate limiting + validation |
| JWT token theft | Low | High | httpOnly cookie + short expiry |
| Image storage cost | Low | Low | Unsplash URLs (no storage needed) |
| Vercel cold start | Medium | Low | Edge runtime for API routes |
| SQL injection | Low | High | Prisma parameterized queries |
| Admin brute force | Medium | High | Login attempt limiting |
| Data loss | Low | High | Neon automatic backups |

## 4. Assumptions
- School is CBSE affiliated in Bangalore
- Admin manages content manually via dashboard
- No payment processing required
- English-only content

## 5. Constraints
- Free tier limits on Vercel and Neon
- No server-side file storage (use URL references)
