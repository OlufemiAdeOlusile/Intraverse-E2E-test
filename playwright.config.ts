import { devices } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 0,
  expect: {
    timeout: 100000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports/html',
      },
    ],
  ],
  use: {
    actionTimeout: 10000,
    navigationTimeout: 10000,
    baseURL: process.env.BASE_URL,
    launchOptions: {
      headless: true,
      slowMo: 0,
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: {
      mode: 'retain-on-failure',
    },
    viewport: { width: 1920, height: 1080 },
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { args: ['--disable-gpu', '--disable-dev-shm-usage'] },
      },
    },
  ],
};
export default config;
