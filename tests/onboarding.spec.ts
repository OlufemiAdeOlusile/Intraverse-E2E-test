import { test } from 'src/fixtures';
import { businessType, defaultUser, signUpUser, User } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/SignUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/VerificationPage';
import { GettingStartedPage } from '../src/pages/onboarding/GettingStartedPage';
import {
  selectAndFillBusinessDetails,
  fillLegalEntity,
  startBusinessActivation, fillKeyContact, uploadDocuments,
} from 'src/pages/onboarding/gettingStartedFlow';

let loginPage: LoginPage;
let signUpPage: SignUpPage;
let verificationPage: VerificationPage;
let gettingStartedPage: GettingStartedPage;
let user: User;

test.describe.only('Onboarding', () => {
  test.beforeEach('sign up and login', async ({ page }) => {
    /* loginPage = new LoginPage(page);
    gettingStartedPage = new GettingStartedPage(page);
    user = await signUpUser(businessType.starterBusiness);
    await loginPage.landOnPage();
    await loginPage.fillAndSubmitSignInForm(user);
    await gettingStartedPage.landOnPage();*/

    signUpPage = new SignUpPage(page);
    verificationPage = new VerificationPage(page);
    gettingStartedPage = new GettingStartedPage(page);
    loginPage = new LoginPage(page);
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

  test('Activate a new starter business', async ({ page }) => {
    await gettingStartedPage.verifyContentsOnPage();
    await gettingStartedPage.clickActivateMyBusiness();
    await startBusinessActivation(page);
    await selectAndFillBusinessDetails(page, user);
    await fillLegalEntity(page, user);
    await fillKeyContact(page, user);
    await uploadDocuments(page)
  });
});
