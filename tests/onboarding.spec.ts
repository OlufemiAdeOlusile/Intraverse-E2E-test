import { test } from 'src/fixtures';
import { businessType, companyPosition, defaultUser, typeOfBusiness, User } from 'src/fixtures/user';
import { LoginPage } from 'src/pages/signUpAndLogin/LoginPage';
import { SignUpPage } from 'src/pages/signUpAndLogin/SignUpPage';
import { VerificationPage } from 'src/pages/signUpAndLogin/VerificationPage';
import { GettingStartedPage } from '../src/pages/onboarding/GettingStartedPage';
import {
  fillKeyContact,
  fillLegalEntity,
  selectAndFillBusinessDetails,
  startBusinessActivation,
  submitForReview,
  uploadDocuments,
  weHaveReceivedYourActivation,
} from 'src/pages/onboarding/gettingStartedFlow';

let loginPage: LoginPage;
let signUpPage: SignUpPage;
let verificationPage: VerificationPage;
let gettingStartedPage: GettingStartedPage;
let user: User;

test.describe.only('Onboarding', () => {
  test.beforeEach('sign up and login', async ({ page }) => {
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
    user = {
      ...user,
      businessDetail: {
        ...user.businessDetail,
        businessType: businessType.starterBusiness,
        keyContact: {
          ...user.businessDetail.keyContact,

          //CHANGE TO OWNER ONCE BUG IS FIXED
          position: companyPosition.shareHolder
        }
      },
    };
    await gettingStartedPage.verifyContentsOnPage();
    await gettingStartedPage.clickActivateMyBusiness();
    await startBusinessActivation(page);
    await selectAndFillBusinessDetails(page, user);
    await fillLegalEntity(page, user);
    await fillKeyContact(page, user);
    await uploadDocuments(page, user);
    await submitForReview(page, user);
    await weHaveReceivedYourActivation(page);
    await gettingStartedPage.verifyBusinessUnderReview();
  });

  test('Activate a new registered business without IATA', async ({ page }) => {
    user = {
      ...user,
      businessDetail: {
        ...user.businessDetail,
        businessType: businessType.registeredBusinessWithoutIata,
        legalEntity: {
          ...user.businessDetail.legalEntity,
          typeOfBusiness: typeOfBusiness.nonRegistered,
        },
        keyContact: {
          ...user.businessDetail.keyContact,
          position: companyPosition.shareHolder
        }
      },
    };
    await gettingStartedPage.verifyContentsOnPage();
    await gettingStartedPage.clickActivateMyBusiness();
    await startBusinessActivation(page);
    await selectAndFillBusinessDetails(page, user);
    await fillLegalEntity(page, user);
    await fillKeyContact(page, user);
    await uploadDocuments(page, user);
    await submitForReview(page, user);
    await weHaveReceivedYourActivation(page);
    await gettingStartedPage.verifyBusinessUnderReview();
  });

  test('Activate a new registered business without IATA and sole proprietorship', async ({ page }) => {
    user = {
      ...user,
      businessDetail: {
        ...user.businessDetail,
        businessType: businessType.registeredBusinessWithoutIata,
        legalEntity: {
          ...user.businessDetail.legalEntity,
          typeOfBusiness: typeOfBusiness.soleProprietor,
        },
        keyContact: {
          ...user.businessDetail.keyContact,
          position: companyPosition.shareHolder
        }
      },
    };
    await gettingStartedPage.verifyContentsOnPage();
    await gettingStartedPage.clickActivateMyBusiness();
    await startBusinessActivation(page);
    await selectAndFillBusinessDetails(page, user);
    await fillLegalEntity(page, user);
    await fillKeyContact(page, user);
    await uploadDocuments(page, user);
    await submitForReview(page, user);
    await weHaveReceivedYourActivation(page);
    await gettingStartedPage.verifyBusinessUnderReview();
  });

  test('Activate a new registered business with IATA', async ({
    page,
  }) => {
    await gettingStartedPage.verifyContentsOnPage();
    await gettingStartedPage.clickActivateMyBusiness();
    await startBusinessActivation(page);
    await selectAndFillBusinessDetails(page, user);
    await fillLegalEntity(page, user);
    await fillKeyContact(page, user);
    await uploadDocuments(page, user);
    await submitForReview(page, user);
    await weHaveReceivedYourActivation(page);
    await gettingStartedPage.verifyBusinessUnderReview();
  });
});
