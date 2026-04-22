import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    extraHTTPHeaders: {
      ...(process.env.VERCEL_PROTECTION_BYPASS_TOKEN
        ? { "x-vercel-protection-bypass": process.env.VERCEL_PROTECTION_BYPASS_TOKEN }
        : {}),
    },
  },
});
