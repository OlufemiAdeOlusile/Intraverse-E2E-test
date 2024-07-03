import { test } from 'src/fixtures';
import { User, defaultUser } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/SignUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/VerificationPage';
import { GettingStartedPage } from '../src/pages/onboarding/GettingStartedPage';

let loginPage: LoginPage;
let signUpPage: SignUpPage;
let verificationPage: VerificationPage;
let gettingStartedPage: GettingStartedPage;
let user: User;
test.describe('Onboarding', () => {
  test.beforeEach('sign up and login', async ({ page }) => {
    loginPage = new LoginPage(page);
    signUpPage = new SignUpPage(page);
    verificationPage = new VerificationPage(page);
    gettingStartedPage = new GettingStartedPage(page);
    user = await defaultUser();
    await loginPage.landOnPage();
    await loginPage.clickSignUp();
    await signUpPage.clickSignUpWithEmail();
    await signUpPage.fillAndSubmitSignUpForm(user);
    const token: string = await verificationPage.getTokenFromEmailClient(
      user.email,
      user.emailClientPassword,
    );
    await verificationPage.enterToken(token);
    await verificationPage.submitToken();
  });

  test('Activate a new starter business', async () => {
    await gettingStartedPage.verifyContentsOnPage();
  });
});
