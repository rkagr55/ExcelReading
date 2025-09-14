// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Each test is given 30 seconds. Playwright enforces a timeout for each test, 30 seconds by default. Time spent by the  test function, test fixtures and beforeEach hooks is included in the test timeout.
  timeout: 30000,

  outputDir: 'test-results',   // Folder for test artifacts such as screenshots, videos, traces, etc.
  // path to the global setup files. This file will be required and run before all the tests. It must export a single function.
  //globalSetup: require.resolve('./global-setup'),
  // path to the global teardown files.  This file will be required and run after all the tests. It must export a single function.
  // globalTeardown: require.resolve('./global-teardown'),

  expect: {
    timeout: 5000,  // Maximum time expect() should wait for the condition to be met.
  },

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,  //on CI non parallel and locally parallel
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /*
  reporter: [ ['list'],  ['line'], ['json', {  outputFile: 'test-results.json' }]  ],
  Concise 'dot' for CI, default 'list' when running locally .   reporter: process.env.CI ? 'dot' : 'list',
  npx playwright test --reporter=line
  Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  // testIgnore: '*test-assets',  // Glob patterns or regular expressions to ignore test files.
  // testMatch: '*todo-tests/*.spec.ts',  // Glob patterns or regular expressions that match test files.
  //By default, Playwright runs .*(test|spec).(js|ts|mjs) files.

  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    screenshot: 'only-on-failure',  //'off', 'on' and 'only-on-failure'.     // Capture screenshot after each test failure.
    trace: 'on-first-retry', //'off', 'on', 'retain-on-failure' and 'on-first-retry'.  // Record trace only when retrying a test for the first time.
    video: 'on-first-retry', //'off', 'on', 'retain-on-failure' and 'on-first-retry'.  // Record video only when retrying a test for the first time.
    actionTimeout: 10000, // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    bypassCSP: true,      // Toggles bypassing Content-Security-Policy.
    headless: true,    //headless mode setting

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ["--start-maximized"],
        },
        fullyParallel: true,
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
        fullyParallel: false,
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

