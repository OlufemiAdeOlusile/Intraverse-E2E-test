import { FileChooser, Page } from 'playwright';
import { expect } from 'playwright/test';
import { Profile } from '../../types/api/user/getProfile'; // Profile is imported from the correct path
import {
  chooseFromDropDownByRole,
  clickByButton,
  clickByLink,
  fillByRoleTextBox,
  fillBySelector,
  getByHeading,
  ROLE_NAMES,
  verifyTextByRole,
  verifyTextViaTextSelector,
} from '../../utils/dto';
import { getUploadDocFilePath } from '../../utils/utility';
import { Locator } from '@playwright/test';
import { businessType } from '../../fixtures/user';

const activateBusinessLocators = {
  addButton: /add/i,
  activateBusinessHeading: /activate business on intraverse/i,
};

const businessDetails = {
  starterBusiness: /starter business/i,
  registeredBusinessWithIata: /registered business with iata license/i,
  registeredBusinessWithoutIata: /registered business without iata license/i,
  continueButton: /continue/i,

  tradingName: /trading name/i,
  businessAddress: /business address/i,
  phoneNumber: 'input[name="phone"]',
  email: 'input[type="email"]',
  nextButton: /next/i,
};

const legalEntity = {
  asARegulatedBody:
    /as a regulated company, we will need you to complete this step when you have registered your business\./i,
  continueButton: /continue/i,
  registeredBusinessName: /registered business name/i,
  typeOfRegisteredBusiness: /type of registered business/i,
  companyNumber: /company number/i,
  taxIdentificationNumber: /tax identification number/i,
  nextButton: /next/i,
};

const keyContact = {
  businessRepTextHeading:
    /a business representative is either an owner, director or shareholder of your business\./i,
  firstName: /first name/i,
  lastName: /last name/i,
  position: /position \/ job title/i,
  contactEmail: /contact email/i,
  contactPhoneNumber: 'input[name="phone"]',
  nextButton: /next/i,
};

const uploadDocument = {
  kindlyUploadHeading:
    /kindly upload your cac document below to verify your business\./i,
  uploadAndContinue: /upload and continue/i,
};

export const startBusinessActivation = async (page: Page) => {
  await verifyHeadingForActivateBusiness(page);
  await clickAddButtonOnActivateBusiness(page);
};

export const selectAndFillBusinessDetails = async (
  page: Page,
  user: Profile,
) => {
  // Select BusinessType
  const dynamicSelector: string = `h5:has-text("${user.data.account.firstName} ${user.data.account.lastName}, Welcome to Intraverse!")`;
  await verifyTextViaTextSelector(page, dynamicSelector);
  await selectBusinessType(user, page);

  // Fill Business Details
  const dynamicSelector2: string = `h5:has-text("Hey ${user.data.account.firstName}, let's get you started!")`;
  await verifyTextViaTextSelector(page, dynamicSelector2);
  await fillBusinessDetailsForm(page, user);
};

export const fillLegalEntity = async (page: Page, user: Profile) => {
  if (
    user.data.account.detail.agencyType.includes(businessType.starterBusiness)
  ) {
    await page
      .getByText(legalEntity.asARegulatedBody)
      .waitFor({ state: 'visible' });
    await clickByButton(page, legalEntity.continueButton);
  } else {
    await fillByRoleTextBox(
      page,
      legalEntity.registeredBusinessName,
      user.data.account.detail.registeredBusinessName,
    );
    await fillByRoleTextBox(
      page,
      legalEntity.companyNumber,
      user.data.account.detail.legalInfo.companyNumber,
    );
    await fillByRoleTextBox(
      page,
      legalEntity.taxIdentificationNumber,
      user.data.account.detail.legalInfo.taxIdentification,
    );
    await chooseFromDropDownByRole(
      page,
      legalEntity.typeOfRegisteredBusiness,
      user.data.account.detail.typeOfBusiness,
    );
    await clickByButton(page, legalEntity.nextButton);
  }
};

export const fillKeyContact = async (page: Page, user: Profile) => {
  await page
    .getByText(keyContact.businessRepTextHeading)
    .waitFor({ state: 'visible' });

  await fillByRoleTextBox(
    page,
    keyContact.firstName,
    user.data.account.detail.contact.firstName,
  );
  await fillByRoleTextBox(
    page,
    keyContact.lastName,
    user.data.account.detail.contact.lastName,
  );
  await fillByRoleTextBox(
    page,
    keyContact.contactEmail,
    user.data.account.detail.contact.email,
  );
  await fillBySelector(
    page,
    keyContact.contactPhoneNumber,
    user.data.account.detail.contact.phoneNumber,
  );
  await chooseFromDropDownByRole(
    page,
    keyContact.position,
    user.data.account.detail.contact.position,
  );
  await clickByButton(page, businessDetails.nextButton);
};

export const uploadDocuments = async (page: Page, user: Profile) => {
  if (
    user.data.account.detail.agencyType.includes(businessType.starterBusiness)
  ) {
    await clickByButton(page, /continue/i);
  } else {
    await page
      .getByText(uploadDocument.kindlyUploadHeading)
      .waitFor({ state: 'visible' });

    const absoluteFilePath: string = getUploadDocFilePath();
    const buttons: Locator = await page.locator(
      'button:has-text("Choose File")',
    );

    const buttonCount: number = await buttons.count();
    for (let i: number = 0; i < buttonCount; i++) {
      const button: Locator = buttons.nth(i);
      const fileChooserPromise: Promise<FileChooser> =
        page.waitForEvent('filechooser');
      await button.click();
      const fileChooser: FileChooser = await fileChooserPromise;
      await fileChooser.setFiles(absoluteFilePath);
    }
    await clickByButton(page, uploadDocument.uploadAndContinue);
  }
};

export const submitForReview = async (page: Page, user: Profile) => {
  await verifyTextByRole(page, user.data.account.detail.tradingName);
  await verifyTextByRole(
    page,
    user.data.account.detail.address.businessLocation,
  );

  if (
    !user.data.account.detail.agencyType.includes(businessType.starterBusiness)
  ) {
    await verifyTextByRole(
      page,
      user.data.account.detail.registeredBusinessName,
    );
    await verifyTextByRole(
      page,
      user.data.account.detail.legalInfo.companyNumber,
    );
    await verifyTextByRole(page, user.data.account.detail.typeOfBusiness);
    await verifyTextByRole(
      page,
      user.data.account.detail.legalInfo.taxIdentification,
    );
  }

  await verifyTextByRole(page, user.data.account.detail.contact.firstName);
  await verifyTextByRole(page, user.data.account.detail.contact.lastName);
  await verifyTextByRole(page, user.data.account.detail.contact.position);

  await clickByButton(page, /submit for review/i);
};

export const weHaveReceivedYourActivation = async (page: Page) => {
  await (
    await getByHeading(page, /we have received your activation request/i)
  ).waitFor({ state: 'visible' });
  await clickByLink(page, /continue/i);
};

const verifyHeadingForActivateBusiness = async (page: Page) => {
  await expect(
    page.getByRole(ROLE_NAMES.HEADING, {
      name: activateBusinessLocators.activateBusinessHeading,
    }),
  ).toBeVisible();
};

const clickAddButtonOnActivateBusiness = async (page: Page) => {
  await page
    .getByRole(ROLE_NAMES.BUTTON, {
      name: activateBusinessLocators.addButton,
    })
    .first()
    .click();
};

const fillBusinessDetailsForm = async (page: Page, user: Profile) => {
  await fillByRoleTextBox(
    page,
    businessDetails.tradingName,
    user.data.account.detail.tradingName,
  );
  await fillByRoleTextBox(
    page,
    businessDetails.businessAddress,
    user.data.account.detail.address.businessLocation,
  );
  await fillBySelector(
    page,
    businessDetails.phoneNumber,
    user.data.account.detail.businessPhone,
  );
  await fillBySelector(
    page,
    businessDetails.email,
    user.data.account.detail.businessEmail,
  );
  await clickByButton(page, businessDetails.nextButton);
};

const selectBusinessType = async (user: Profile, page: Page) => {
  if (
    user.data.account.detail.agencyType.includes(businessType.starterBusiness)
  ) {
    await page.getByText(businessDetails.starterBusiness).click();
  }

  if (
    user.data.account.detail.agencyType.includes(
      businessType.registeredBusinessWithIata,
    )
  ) {
    await page.getByText(businessDetails.registeredBusinessWithIata).click();
  }

  if (
    user.data.account.detail.agencyType.includes(
      businessType.registeredBusinessWithoutIata,
    )
  ) {
    await page.getByText(businessDetails.registeredBusinessWithoutIata).click();
  }

  await clickByButton(page, businessDetails.continueButton);
};
