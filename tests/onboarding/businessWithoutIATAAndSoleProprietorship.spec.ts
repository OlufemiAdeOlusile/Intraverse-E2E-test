import { test } from 'src/fixtures';
import {
  businessType,
  companyPosition,
  defaultUser,
  PASSWORD,
  typeOfBusiness,
} from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/loginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/signUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/verificationPage';
import { HomePage } from '../../src/pages/HomePage';
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
import { SubscriptionPage } from '../../src/pages/settings/Business/subscription/subscriptionPage';
import { BrowserContext, Page } from '@playwright/test';
import process from 'process';
import { PayStackSubscriptionPage } from '../../src/pages/settings/Business/subscription/payStackSubscriptionPage';
import { Profile } from '../../src/types/api/user/getProfile';

const { BASE_URL } = process.env;
let context: BrowserContext;
let page: Page;
let loginPage: LoginPage;
let signUpPage: SignUpPage;
let verificationPage: VerificationPage;
let gettingStartedPage: HomePage;
let subscriptionPage: SubscriptionPage;
let paystackPage: PayStackSubscriptionPage;
let user: Profile;

test.describe('Onboarding a sole proprietorship business without IATA and subscribe', (): void => {
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(BASE_URL);

    signUpPage = new SignUpPage(page);
    verificationPage = new VerificationPage(page);
    gettingStartedPage = new HomePage(page);
    subscriptionPage = new SubscriptionPage(page);
    loginPage = new LoginPage(page);
    paystackPage = new PayStackSubscriptionPage(page);

    user = await defaultUser();
    user = {
      ...user,
      data: {
        ...user.data,
        account: {
          ...user.data.account,
          detail: {
            ...user.data.account.detail,
            agencyType: businessType.registeredBusinessWithoutIata,
            typeOfBusiness: typeOfBusiness.soleProprietor,
            contact: {
              ...user.data.account.detail.contact,
              position: companyPosition.shareHolder,
            },
          },
        },
      },
    };
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Onboarding and Subscription Process', async (): Promise<void> => {
    await test.step('Sign up and login', async () => {
      await loginPage.landOnPage();
      await loginPage.clickSignUp();
      await signUpPage.clickSignUpWithEmail();
      await signUpPage.fillAndSubmitSignUpForm(user);
      const token: string = await verificationPage.getTokenFromEmailClient(
        user.data.account.email,
        PASSWORD,
      );
      await verificationPage.enterToken(token);
      await verificationPage.submitToken();
    });

    await test.step('Verify Getting Started Page', async () => {
      await header.verifyNoSubscription(page);
      await gettingStartedPage.verifyContentsOnPage();
    });

    await test.step('Navigate and select business Details', async () => {
      await gettingStartedPage.clickActivateMyBusiness();
      await startBusinessActivation(page);
      await selectAndFillBusinessDetails(page, user);
    });

    await test.step('Fill legal Entity', async () => {
      await fillLegalEntity(page, user);
    });

    await test.step('Fill key Contact', async () => {
      await fillKeyContact(page, user);
    });

    await test.step('Upload Documents', async () => {
      await uploadDocuments(page, user);
    });

    await test.step('Submit and verify Business Under Review', async () => {
      await submitForReview(page, user);
      await weHaveReceivedYourActivation(page);
      await gettingStartedPage.verifyBusinessUnderReview();
    });

    await test.step('Verify Business via Admin', async () => {
      const accountId: string = await getAgentAccountId(user);
      await verifyBusinessViaAdmin(accountId, user);
    });

    await test.step('Verify Subscription process is shown as next process for onboarding', async () => {
      await header.logout(page);
      await loginPage.landOnPage();
      await loginPage.loginUser(user);
      await header.verifySubscription(page);
    });

    await test.step('Navigate to subscription and choose a plan', async () => {
      await gettingStartedPage.clickChooseASubscriptionPlan();
      await subscriptionPage.landOnPage();
      await subscriptionPage.clickSubscribe();
      await subscriptionPage.verifySubscriptionButtonDisabled();
      await subscriptionPage.selectPlan('premium');
      await subscriptionPage.verifyMonthlyPremiumFee();
      await subscriptionPage.agreeToTerms();
      await subscriptionPage.confirmSubscriptionAction();
    });

    await test.step('Pay via Paystack', async () => {
      await paystackPage.chooseSuccess();
      await paystackPage.clickPaymentButton();
    });

    await test.step('Confirm Subscription', async () => {
      await subscriptionPage.verifySuccessfulSubscription();
      await header.verifyMyWebsite(page);
      await header.verifyNoSubscription(page);
      await gettingStartedPage.navigateToSubscription(page, BASE_URL);
      await subscriptionPage.verifyPremiumSubscription();
      await paystackPage.verifyEmailFromPayStack(
        user.data.account.email,
        PASSWORD,
        'Your subscription to Premium is now active',
      );
    });

    await test.step('Change Subscription', async () => {
      await subscriptionPage.clickChangeSubscription();
      await subscriptionPage.selectPlan('ultimate');
      await subscriptionPage.verifyMonthlyUltimateFee();
      await subscriptionPage.agreeToTerms();
      await subscriptionPage.confirmSubscriptionAction();
      await subscriptionPage.verifySuccessAlert();
    });
  });
});
