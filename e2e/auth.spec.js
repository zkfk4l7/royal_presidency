import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {

  test.beforeEach(async ({ request }) => {
    // Seed the database
    await request.post('http://localhost:5001/api/test/seed');
  });

  test('Guest is redirected from Member Portal to Login', async ({ page }) => {
    await page.goto('/portal');
    // We expect the heading to be visible
    await expect(page.locator('h2:has-text("Member Login")')).toBeVisible();
  });

  test('Resident can log in successfully', async ({ page }) => {
    await page.goto('/portal');
    
    // Fill in resident credentials based on seed data
    await page.fill('input[type="email"]', 'resident@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for the Dashboard text or element indicating success
    await expect(page.locator('text=Welcome back,')).toBeVisible();
  });

  test('Admin can log in successfully and see Admin Dashboard', async ({ page }) => {
    await page.goto('/portal'); // Login page is the portal
    
    // Fill in admin credentials 
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for successful login first
    await expect(page.locator('text=Welcome back,')).toBeVisible();

    // Navigate to admin
    await page.goto('/admin');

    // Check for admin dashboard unique elements
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();
  });
});
