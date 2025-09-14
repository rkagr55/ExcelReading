import { test, expect} from '@playwright/test';
test('test1', async ({page}) => {
  await page.goto('https://google.com');
  await expect(page).toHaveTitle(/Google/);
  await page.waitForTimeout(5000);
});
