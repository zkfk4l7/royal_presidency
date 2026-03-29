import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  workers: 1, // To avoid breaking the memory DB concurrent state
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    headless: true, // run headlessly
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
       command: 'cd royal-presidency-cghs && npm run dev',
       port: 5173,
       reuseExistingServer: !process.env.CI,
       timeout: 120 * 1000,
    },
    {
       command: 'cd backend && npm run start',
       port: 5001,
       reuseExistingServer: !process.env.CI,
       timeout: 120 * 1000,
       env: { PORT: "5001", TEST_MODE: "true" } // specify port and sandbox db
    }
  ],
});
