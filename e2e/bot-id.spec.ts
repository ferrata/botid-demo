import { expect, test } from "@playwright/test";

test("clicking Check on Server shows a BotId response", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /check on server/i }).click();
  
  const pre = page.locator("pre");
  await expect(pre).toBeVisible();
  
  const text = await pre.innerText();
  const json = JSON.parse(text);
  expect(json.isBot).toBe(false);
});
