import { Locator, Page, expect } from '@playwright/test';
import { ROLE_NAMES } from '../../../utils/dto';
import { SettingsPage } from '../settingsPage';

export class SubscriptionPage extends SettingsPage {
  readonly subscribeButton: Locator;
  readonly learnAboutSubscription: Locator;
  readonly confirmSubscription: Locator;
  readonly confirmSubscriptionTermsCheckBox: Locator;
  readonly planDropdown: Locator;
  readonly billingCycleSwitch: Locator;
  readonly starterPlan: Locator;
  readonly premiumPlan: Locator;
  readonly ultimatePlan: Locator;
  readonly starterMonthlyFee: Locator;
  readonly starterYearlyFee: Locator;
  readonly premiumMonthlyFee: Locator;
  readonly premiumYearlyFee: Locator;
  readonly ultimateYearlyFee: Locator;
  readonly ultimateMonthlyFee: Locator;
  readonly subscriptionSuccessfulMessage: Locator;
  readonly subscriptionSuccessContinueButton: Locator;
  readonly subscriptionStarterPlan: Locator;
  readonly subscriptionPremiumPlan: Locator;
  readonly subscriptionUltimatePlan: Locator;
  readonly cancelSubscription: Locator;
  readonly yesCancel: Locator;

  constructor(page: Page) {
    super(page);
    this.subscribeButton = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /subscribe/i,
    });
    this.learnAboutSubscription = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /learn about subscriptions/i,
    });
    this.confirmSubscription = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /confirm subscription/i,
    });
    this.confirmSubscriptionTermsCheckBox = page.getByRole(
      ROLE_NAMES.CHECKBOX,
      {
        name: /i agree to the main services agreement, privacy policy, terms and conditions for any applicable add-ons\. i understand my subscription starts today\./i,
      },
    );
    this.planDropdown = page.getByRole(ROLE_NAMES.COMBO_BOX, {
      name: /select a plan/i,
    });
    this.billingCycleSwitch = page.getByRole('checkbox');
    this.starterPlan = page.getByRole(ROLE_NAMES.OPTION, { name: /starter/i });
    this.premiumPlan = page.getByRole(ROLE_NAMES.OPTION, { name: /premium/i });
    this.ultimatePlan = page.getByRole(ROLE_NAMES.OPTION, {
      name: /ultimate/i,
    });
    this.starterMonthlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦7,500/i,
    });
    this.starterYearlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦90,000/i,
    });
    this.premiumMonthlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦30,000/i,
    });
    this.premiumYearlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦360,000/i,
    });
    this.ultimateMonthlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦75,000/i,
    });
    this.ultimateYearlyFee = page.getByRole(ROLE_NAMES.HEADING, {
      name: /₦900,000/i,
    });
    this.subscriptionSuccessfulMessage = page.getByText(
      /your subscribtion for a plan is successful\./i,
    );
    this.subscriptionSuccessContinueButton = page.getByText(/continue/i);
    this.subscriptionStarterPlan = page.getByRole(ROLE_NAMES.HEADING, {
      name: /starter/i,
    });
    this.subscriptionPremiumPlan = page.getByRole(ROLE_NAMES.HEADING, {
      name: /premium/i,
    });
    this.subscriptionUltimatePlan = page.getByRole(ROLE_NAMES.HEADING, {
      name: /ultimate/i,
    });
    this.cancelSubscription = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /cancel/i,
    });
    this.yesCancel = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /yes, cancel/i,
    });
  }

  async landOnPage() {
    await expect(this.subscribeButton).toBeVisible();
  }

  async clickSubscribe() {
    await this.subscribeButton.click();
  }

  async verifyLeanAboutSubscription() {
    await expect(this.learnAboutSubscription).toBeVisible();
  }

  async selectPlan(planName: string) {
    await this.planDropdown.click();
    switch (planName.toLowerCase()) {
      case 'starter':
        await this.starterPlan.click();
        break;
      case 'premium':
        await this.premiumPlan.click();
        break;
      case 'ultimate':
        await this.ultimatePlan.click();
        break;
      default:
        await this.starterPlan.click();
    }
  }

  async verifyMonthlyStarterFee() {
    await expect(this.starterMonthlyFee).toBeVisible();
  }

  async verifyYearlyStarterFee() {
    await expect(this.starterYearlyFee).toBeVisible();
  }

  async verifyMonthlyPremiumFee() {
    await expect(this.premiumMonthlyFee).toBeVisible();
  }

  async verifyYearlyPremiumFee() {
    await expect(this.premiumYearlyFee).toBeVisible();
  }

  async verifyMonthlyUltimateFee() {
    await expect(this.ultimateMonthlyFee).toBeVisible();
  }

  async verifyYearlyUltimateFee() {
    await expect(this.ultimateYearlyFee).toBeVisible();
  }

  async toggleBillingCycle() {
    await this.billingCycleSwitch.first().check();
  }

  async agreeToTerms() {
    await this.confirmSubscriptionTermsCheckBox.check();
  }

  async confirmSubscriptionAction() {
    await this.confirmSubscription.click();
  }

  async verifySubscriptionButtonEnabled() {
    await expect(this.confirmSubscription).toBeEnabled();
  }

  async verifySubscriptionButtonDisabled() {
    await expect(this.confirmSubscription).toBeDisabled();
  }

  async verifySuccessfulSubscription() {
    await expect(this.subscriptionSuccessContinueButton).toBeVisible();
    await this.subscriptionSuccessContinueButton.click();
  }

  async verifyStarterSubscription() {
    await expect(this.subscriptionStarterPlan).toBeVisible();
  }

  async verifyPremiumSubscription() {
    await expect(this.subscriptionPremiumPlan).toBeVisible();
  }

  async verifyUltimateSubscription() {
    await expect(this.subscriptionUltimatePlan).toBeVisible();
  }

  async cancelActiveSubscription() {
    await this.cancelSubscription.click();
    await this.yesCancel.click();
  }
}
