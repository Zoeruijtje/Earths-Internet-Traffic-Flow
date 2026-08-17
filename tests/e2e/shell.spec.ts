import { expect, test } from '@playwright/test';

test('boots with honest disconnected state and no overflow', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('DATA NOT CONNECTED');
  await expect(page.getByRole('heading', { name: 'The Internet has a geography.' })).toBeVisible();
  await expect(page.locator('canvas')).toHaveCount(1);

  const overflow = await page.evaluate(() => ({
    x: document.documentElement.scrollWidth > window.innerWidth,
    y: document.documentElement.scrollHeight > window.innerHeight,
  }));

  expect(overflow).toEqual({ x: false, y: false });
});
