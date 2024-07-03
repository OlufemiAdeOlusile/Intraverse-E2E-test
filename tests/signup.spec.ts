import { test } from 'src/fixtures';
import { User, defaultUser } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/SignUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/VerificationPage';

test.describe('Playwright', () => {
  test('Sign up a new user, logout and verify login', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const signUpPage: SignUpPage = new SignUpPage(page);
    const verificationPage: VerificationPage = new VerificationPage(page);
    const newuser: User = await defaultUser();

    await loginPage.landOnPage();
    await loginPage.clickSignUp();
    await signUpPage.clickSignUpWithEmail();
    await signUpPage.fillAndSubmitSignUpForm(newuser);

    const token: string = await verificationPage.getTokenFromEmailClient(
      newuser.email,
    );

    await verificationPage.enterToken(token);
    await verificationPage.submitToken();
  });
});
