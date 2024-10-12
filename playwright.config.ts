import { defineConfig, devices, ViewportSize } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
require('dotenv').config()
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
   baseURL: process.env.ENV_BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    
  {
    name : 'Chromium - Airbnb visitor tests',
    testMatch : /.*airbnb.*\.spec.ts/,
    use: {
      ...devices['Desktop Chrome'],

      // putting viewport as 1080p as it is the most common resolution
      viewport : { width :1920, height: 1080} as ViewportSize,
    },

  },

  // You can uncomment the firefox and safari browsers if you wish to check them as well 

    // {
    //   name: 'Firefox - Airbnb visitor tests',
    //   testMatch : /.*airbnb.*\.spec.ts/,
    //   use: {
    //      ...devices['Desktop Firefox'],
        
    //     // putting viewport as 1080p as it is the most common resolution
    //     viewport : { width :1920, height: 1080} as ViewportSize,
    //   },
    // },

    // {
    //   name: 'Safari - Airbnb visitor tests',
    //   testMatch : /.*airbnb.*\.spec.ts/,
    //   use: { 
    //     ...devices['Desktop Safari'],
        
    //     // putting viewport as 1080p as it is the most common resolution
    //     viewport : { width :1920, height: 1080} as ViewportSize, 
    //   },
    // },

  
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
