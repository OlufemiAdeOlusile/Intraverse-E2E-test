import { test } from 'src/fixtures';
import { User, defaultUser } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/LoginPage';
import { SignUpPage } from 'src/pages/SignUpPage';
import { VerificationPage } from 'src/pages/VerificationPage';
import {getInbox, getNewEmail} from 'src/utils/emailClient';

const { BASE_URL } = process.env;

test.describe('Playwright', () => {
  test('Sign up a new user if not registered', async ({ page }) => {

    const loginPage: LoginPage = new LoginPage(page);
    const signUpPage: SignUpPage = new SignUpPage(page);
    const verificationPage: VerificationPage = new VerificationPage(page);
    const newuser: User =  await defaultUser();

    // Navigate to the login page
    await loginPage.verifyPage();
    // Click the sign-up button to navigate to the sign-up page
    await loginPage.clickSignUp();
    // Land and verify Sign Up page
    await signUpPage.verifyPage();
    //click signup via email
    await signUpPage.clickSignUpWithEmail();
    // fill and submit signup;
    await signUpPage.fillAndSubmitSignUpForm(newuser);

    await getInbox(newuser.email);
   
    // Verification page steps
    await verificationPage.verifyPage();

    // Assume you have a way to retrieve the token (e.g., from email, mock service, etc.)
    const token = '123456'; // Replace this with actual logic to retrieve the token
    await page.pause();
    await verificationPage.enterToken(token);
    await page.pause();
    await verificationPage.submitToken();

    // Add assertions to verify the next steps after verification, e.g., redirection or success message
    // Example:
    //await expect(page).toHaveURL('https://frontend.qa.intraversewebservices.com/');
    // await expect(page.locator('success-message-selector')).toBeVisible();

  });
});
