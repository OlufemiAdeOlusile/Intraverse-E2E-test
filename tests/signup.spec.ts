import { test } from 'src/fixtures';
import { Locator } from '@playwright/test';


const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  test('Save all Company details', async ({ page }) => {
    console.log('test')
  });
});
