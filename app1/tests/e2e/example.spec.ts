import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/app1');

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId("app1-title")).toHaveText("app1 is mounted!")
});