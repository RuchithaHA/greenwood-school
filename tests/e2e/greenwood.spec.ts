import { test, expect } from '@playwright/test'

test.describe('Greenwood School E2E Tests', () => {
  test('TC-001: Home page loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Nurturing Minds Since 1995')
  })

  test('TC-002: Navbar has all links', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('nav')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Academics' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Activities' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Admissions' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Events' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Gallery' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()
  })

  test('TC-003: Registration form validation', async ({ page }) => {
    await page.goto('/registration')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Student name is required')).toBeVisible()
  })

  test('TC-004: Registration form submit', async ({ page }) => {
    await page.goto('/registration')
    await page.fill('input[name="studentName"]', 'Test Student')
    await page.fill('input[name="dob"]', '2020-01-01')
    await page.selectOption('select[name="classApplying"]', '1')
    await page.click('input[value="Male"]')
    await page.fill('input[name="parentName"]', 'Test Parent')
    await page.fill('input[name="phone"]', '9876543210')
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`)
    await page.fill('textarea[name="address"]', '123 Test Address')
    await page.click('button[type="submit"]')
  })

  test('TC-005: Admin login wrong password', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('input[name="email"]', 'admin@greenwood.edu')
    await page.fill('input[name="password"]', 'wrongpassword')
    await page.click('button[type="submit"]')
    await expect(page.locator('text=Invalid email or password')).toBeVisible()
  })

  test('TC-006: Admin login correct credentials', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('input[name="email"]', 'admin@greenwood.edu')
    await page.fill('input[name="password"]', 'Admin@1234')
    await page.click('button[type="submit"]')
    await page.waitForURL('/admin/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })

  test('TC-007: Admin dashboard stats', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('input[name="email"]', 'admin@greenwood.edu')
    await page.fill('input[name="password"]', 'Admin@1234')
    await page.click('button[type="submit"]')
    await page.waitForURL('/admin/dashboard')
    await expect(page.locator('text=Total Registrations')).toBeVisible()
    await expect(page.locator('text=Pending')).toBeVisible()
    await expect(page.locator('text=Approved')).toBeVisible()
    await expect(page.locator('text=Rejected')).toBeVisible()
  })

  test('TC-008: Admin registrations table', async ({ page }) => {
    await page.goto('/admin/login')
    await page.fill('input[name="email"]', 'admin@greenwood.edu')
    await page.fill('input[name="password"]', 'Admin@1234')
    await page.click('button[type="submit"]')
    await page.goto('/admin/registrations')
    await expect(page.locator('table')).toBeVisible()
  })

  test('TC-010: Gallery page', async ({ page }) => {
    await page.goto('/gallery')
    await expect(page.locator('h1')).toContainText('Gallery')
  })

  test('TC-011: Contact form submit', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '9876543210')
    await page.fill('textarea[name="message"]', 'Test message')
    await page.click('button[type="submit"]')
  })

  test('TC-012: Mobile hamburger menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.click('button')
    await expect(page.locator('text=About')).toBeVisible()
  })

  test('TC-013: Events page', async ({ page }) => {
    await page.goto('/events')
    await expect(page.locator('h1')).toContainText('Events')
  })

  test('TC-014: About page', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Principal')).toBeVisible()
  })

  test('TC-015: Footer contact info', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('text=123 Education Lane')).toBeVisible()
  })
})
