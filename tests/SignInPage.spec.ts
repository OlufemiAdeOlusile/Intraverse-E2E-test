import { test } from 'src/fixtures';
import { User } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';


test.describe('Login', () => {
  test('Sign in an existing user', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);

    const existingUser: User = {
      email: 'fl7ab@navalcadets.com', 
      password: '@Test12345',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    };

    // Verify the sign-in page
    await loginPage.landOnPage();

    await loginPage.fillAndSubmitSignInForm(existingUser);
  });
});
