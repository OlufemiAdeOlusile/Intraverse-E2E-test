import { test } from 'src/fixtures';
import { User, defaultUser } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/SignUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/VerificationPage';

test.describe('Sign UP', () => {
  test('Sign up a new user, logout and verify login', async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const signUpPage: SignUpPage = new SignUpPage(page);
    const verificationPage: VerificationPage = new VerificationPage(page);
    const newUser: User = await defaultUser();

    await loginPage.landOnPage();
    await loginPage.clickSignUp();
    await signUpPage.clickSignUpWithEmail();
    await signUpPage.fillAndSubmitSignUpForm(newUser);

    const token: string = await verificationPage.getTokenFromEmailClient(
      newUser.email,
      newUser.emailClientPassword,
    );

    await verificationPage.enterToken(token);
    await verificationPage.submitToken();
  });
});
