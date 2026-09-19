import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  use: {
    baseURL: "https://coffee-cart.app/",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    {
      name: "coffee-cart",
      testMatch: "coffee-cart/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://coffee-cart.app/",
      },
    },

    {
      name: "aria-practice",
      testMatch: "aria-practice/**/*.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "http://104.168.59.50/laboratory/aria",
      },
    },
  ],
});
