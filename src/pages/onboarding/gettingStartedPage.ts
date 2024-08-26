import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../basePage';

export class GettingStartedPage extends BasePage {
  readonly gettingStartedText: Locator;
  readonly homeTab: Locator;
  readonly dashboardTab: Locator;
  readonly ordersTab: Locator;
  readonly customersTab: Locator;
  readonly newToIntraverseText: Locator;
  readonly startYourGuideButton: Locator;
  readonly bookAFlightText: Locator;
  readonly activateMyBusiness: Locator;
  readonly chooseASubscriptionPlan: Locator;
  readonly addCompanyLogo: Locator;
  readonly businessUnderReview: Locator;

  constructor(page: Page) {
    super(page);
    this.gettingStartedText = page.getByText(/getting started/i);
    this.homeTab = page.getByRole('tab', { name: /home/i });
    this.dashboardTab = page.getByRole('tab', { name: /dashboard/i });
    this.ordersTab = page.getByRole('tab', { name: /orders/i });
    this.customersTab = page.getByRole('tab', { name: /customers/i });
    this.newToIntraverseText = page.getByText(
      /new to intraverse\? try the 4 step guide to get started\./i,
    );
    this.startYourGuideButton = page.getByRole('button', {
      name: /start your guide/i,
    });
    this.bookAFlightText = page.getByText(/book a flight/i);
    this.activateMyBusiness = page.getByRole('link', {
      name: 'Activate my business',
    });
    this.chooseASubscriptionPlan = page.getByRole('link', {
      name: 'Choose a subscription plan',
    });

    this.addCompanyLogo = page.getByRole('link', {
      name: /add company logo/i,
    });

    this.businessUnderReview = page.getByText(/business under review/i);
  }

  async landOnPage() {
    await expect(this.gettingStartedText.first()).toBeVisible();
  }

  async verifyBusinessUnderReview() {
    await expect(this.businessUnderReview).toBeVisible();
  }

  async verifyContentsOnPage() {
    await expect(this.homeTab).toBeVisible();
    await expect(this.dashboardTab).toBeVisible();
    await expect(this.ordersTab).toBeVisible();
    await expect(this.customersTab).toBeVisible();
    await expect(this.newToIntraverseText).toBeVisible();
    await expect(this.startYourGuideButton).toBeVisible();
    await expect(this.bookAFlightText).toBeVisible();
    await expect(this.startYourGuideButton).toBeVisible();
  }

  async clickActivateMyBusiness() {
    await this.activateMyBusiness.click();
  }

  async clickChooseASubscriptionPlan() {
    await this.chooseASubscriptionPlan.click();
  }

  async clickAddCompanyLogo() {
    await this.addCompanyLogo.click();
  }

  async verifyAddCompanyLogoToBeHidden() {
    await expect(this.addCompanyLogo).toBeHidden();
  }
}
