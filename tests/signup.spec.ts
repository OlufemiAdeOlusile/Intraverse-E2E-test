import { test } from 'src/fixtures';
import { LoginPage } from 'src/pages/LoginPage';


const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  test('Sign up a new user', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    await loginPage.verifyPage(BASE_URL)
    await loginPage.clickSignUp();
  });
});
