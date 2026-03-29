import { test, expect } from '@playwright/test';

test.describe('Complaints & Tickets flows', () => {

  test.beforeEach(async ({ page, request }) => {
    // Seed DB
    await request.post('http://localhost:5001/api/test/seed');

    // Login as resident
    await page.goto('/portal');
    await page.fill('input[type="email"]', 'resident@test.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
  });

  test('Resident can create a new ticket', async ({ page }) => {
    // Select a category
    await page.selectOption('select[name="category"]', 'Electrical');
    
    // Enter a description
    await page.fill('textarea[name="description"]', 'The hallway light is flickering continuously.');

    // Submit ticket
    page.on('dialog', dialog => dialog.accept()); // Automatically accept window.alert
    await page.click('button[type="submit"]:has-text("Submit Ticket")');

    // We should see the ticket in the widget now
    await expect(page.locator('text=The hallway light is flickering continuously.')).toBeVisible();
    await expect(page.locator('text=Electrical')).toBeVisible();
  });
});
