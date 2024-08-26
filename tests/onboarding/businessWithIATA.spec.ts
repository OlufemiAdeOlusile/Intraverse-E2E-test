import { test } from 'src/fixtures';
import { defaultUser, User } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/loginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/signUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/verificationPage';
import { GettingStartedPage } from '../../src/pages/onboarding/gettingStartedPage';
import {
  fillKeyContact,
  fillLegalEntity,
  selectAndFillBusinessDetails,
  startBusinessActivation,
  submitForReview,
  uploadDocuments,
  weHaveReceivedYourActivation,
} from 'src/pages/onboarding/gettingStartedFlow';
import { getAgentAccountId } from '../../src/api/client/agent/agentAccount';
import { verifyBusinessViaAdmin } from '../../src/api/client/admin/adminAccount';
import { header } from '../../src/pages/header';
import { SubscriptionPage } from '../../src/pages/settings/Business/subscriptionPage';
import { BrowserContext, Page } from '@playwright/test';
import process from 'process';
import { PayStackSubscriptionPage } from '../../src/pages/settings/Business/payStackSubscriptionPage';

const { BASE_URL } = process.env;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let signUpPage: SignUpPage;
let verificationPage: VerificationPage;
let gettingStartedPage: GettingStartedPage;
let subscriptionPage: SubscriptionPage;
let paystackPage: PayStackSubscriptionPage;
let user: User;

test.describe('Onboarding a business with IATA and subscribe', (): void => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);

    signUpPage = new SignUpPage(page);
    verificationPage = new VerificationPage(page);
    gettingStartedPage = new GettingStartedPage(page);
    subscriptionPage = new SubscriptionPage(page);
    loginPage = new LoginPage(page);
    paystackPage = new PayStackSubscriptionPage(page);

    user = await defaultUser();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('sign up and login', async (): Promise<void> => {
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

  test.describe('Onboard an IATA business', () => {
    test('Verify Getting Started Page', async (): Promise<void> => {
      await header.verifyNoSubscription(page);
      await gettingStartedPage.verifyContentsOnPage();
    });

    test('Navigate and select business Details', async (): Promise<void> => {
      await gettingStartedPage.clickActivateMyBusiness();
      await startBusinessActivation(page);
      await selectAndFillBusinessDetails(page, user);
    });

    test('Fill legal Entity', async (): Promise<void> => {
      await fillLegalEntity(page, user);
    });

    test('Fill key Contact', async (): Promise<void> => {
      await fillKeyContact(page, user);
    });

    test('Upload Documents', async (): Promise<void> => {
      await uploadDocuments(page, user);
    });

    test('Submit and verify Business Under Review', async (): Promise<void> => {
      await submitForReview(page, user);
      await weHaveReceivedYourActivation(page);
      await gettingStartedPage.verifyBusinessUnderReview();
    });

    test('Verify Business via Admin', async (): Promise<void> => {
      const accountId: string = await getAgentAccountId(user);
      await verifyBusinessViaAdmin(accountId, user);
    });

    test('Verify Subscription process is shown as next process for onboarding', async (): Promise<void> => {
      await header.logout(page);
      await loginPage.landOnPage();
      await loginPage.loginUser(user);
      await header.verifySubscription(page);
    });
  });

  test.describe('Subscribe to a monthly ultimate plan', async () => {
    test('Navigate to subscription', async (): Promise<void> => {
      await gettingStartedPage.clickChooseASubscriptionPlan();
      await subscriptionPage.landOnPage();
      await subscriptionPage.clickSubscribe();
    });

    test('Choose a monthly ultimate subscription plan', async (): Promise<void> => {
      await subscriptionPage.verifySubscriptionButtonDisabled();
      await subscriptionPage.selectPlan('ultimate');
      await subscriptionPage.verifyMonthlyUltimateFee();
      await subscriptionPage.agreeToTerms();
      await subscriptionPage.confirmSubscriptionAction();
    });

    test('Pay via Paystack', async (): Promise<void> => {
      await paystackPage.chooseSuccess();
      await paystackPage.clickPaymentButton();
    });

    test('Confirm Subscription', async (): Promise<void> => {
      await subscriptionPage.verifySuccessfulSubscription();
      await header.verifyMyWebsite(page);
      await header.verifyNoSubscription(page);
      await gettingStartedPage.navigateToSubscription(page, BASE_URL);
      await subscriptionPage.verifyUltimateSubscription();
    });
  });
});
