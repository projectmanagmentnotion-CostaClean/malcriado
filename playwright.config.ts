import { defineConfig, devices } from "@playwright/test";

const port = 4317;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 2 } : {}),
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    trace: process.env.CI ? "retain-on-failure" : "on-first-retry",
  },
  webServer: {
    command: "npm run dev -- --mode test --host 127.0.0.1 --port 4317",
    port,
    reuseExistingServer: false,
    timeout: 120000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
