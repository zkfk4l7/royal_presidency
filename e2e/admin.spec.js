import { test, expect } from '@playwright/test';

test.describe('Admin Operations flows', () => {

  test.beforeEach(async ({ page, request }) => {
    // Seed DB
    await request.post('http://localhost:5001/api/test/seed');

    // Login as admin
    await page.goto('/portal');
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Wait for login
    await expect(page.locator('text=Welcome back,')).toBeVisible();

    // Manually go to /admin after login. Though PrivateRoute might handle it, going explicitly is fine.
    await page.goto('/admin');
    
    // Admin dashboard should load after login
    // wait for Members list to load
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible();
  });

  test('Admin can view members list', async ({ page }) => {
    // Wait for the Members tab table
    await expect(page.locator('text=Resident Test')).toBeVisible();
    await expect(page.locator('text=admin@test.com')).toBeVisible();
  });

  test('Admin can navigate and view seeded complaints', async ({ page }) => {
    // Click on complaints tab
    await page.click('button:has-text("Complaints")');

    // Expected to see the seeded leaky pipe complaint
    await expect(page.locator('text=Leaky Pipe')).toBeVisible();
    await expect(page.locator('text=The pipe under the sink is leaking in B-202.')).toBeVisible();
    await expect(page.locator('text=OPEN')).toBeVisible();
  });

  test('Admin can mark complaint as resolved', async ({ page }) => {
    await page.click('button:has-text("Complaints")');
    await expect(page.locator('text=Leaky Pipe')).toBeVisible();
    
    // Initial state is OPEN (which probably turns up as something like OPEN/open, we can just click Resolve)
    // Accept any dialogue since sometimes window.alert is used (like handling API errors, won't hurt)
    page.on('dialog', dialog => dialog.accept());
    
    // Click resolve
    await page.click('button:has-text("Resolve")');

    // Status should change to RESOLVED
    await expect(page.locator('span:has-text("RESOLVED")')).toBeVisible();
  });
});
