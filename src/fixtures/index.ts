import { test as base } from '@playwright/test';
export const test = base.extend({
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL + '/', { waitUntil: 'load' });
    await use(page);
  },
});

export { expect } from '@playwright/test';
