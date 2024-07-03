import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

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
    this.activateMyBusiness = page.getByText(/activate my business/i);
    this.chooseASubscriptionPlan = page.getByText(
      /choose a subscription plan/i,
    );
    this.addCompanyLogo = page.getByText(/add company logo/i);
  }

  async landOnPage() {
    await expect(this.gettingStartedText.first()).toBeVisible();
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
}
