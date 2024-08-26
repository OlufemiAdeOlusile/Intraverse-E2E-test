import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../basePage';

export class PayStackSubscriptionPage extends BasePage {
  readonly success: Locator;
  readonly bankAuthentication: Locator;
  readonly declined: Locator;
  readonly paymentButton: Locator;
  readonly testCards: Locator;
  readonly cardChannel: Locator;
  readonly cancelLinkButton: Locator;

  readonly checkoutCore: Locator;
  readonly header: Locator;
  readonly paymentInfo: Locator;
  readonly merchantLogo: Locator;
  readonly customerEmail: Locator;
  readonly transactionAmount: Locator;
  readonly testBadge: Locator;
  readonly checkoutStage: Locator;
  readonly paymentForm: Locator;
  readonly instructionMessage: Locator;
  readonly cards: Locator;

  constructor(page: Page) {
    super(page);
    this.success = page.getByText(/success/i);
    this.bankAuthentication = page.getByText(/bank authentication/i);
    this.declined = page.getByText(/declined/i);

    this.checkoutCore = page.locator('.checkout__core');
    this.header = this.checkoutCore.locator('.header');
    this.paymentInfo = this.header.locator('.payment-info');
    this.merchantLogo = this.paymentInfo.locator('.merchant-logo img');
    this.customerEmail = this.paymentInfo.locator('.customer-email');
    this.transactionAmount = this.paymentInfo.locator('.transaction-amount');
    this.testBadge = this.header.locator('.test-badge');
    this.checkoutStage = this.checkoutCore.locator('.checkout__stage');
    this.paymentForm = this.checkoutStage.locator('.payment-form');
    this.cardChannel = this.paymentForm.locator('#card-channel');
    this.testCards = this.cardChannel.locator('#test-cards');
    this.instructionMessage = this.testCards.locator('.instructions__message');
    this.cards = this.testCards.locator('.card');
    this.paymentButton = this.testCards.locator(
      'button[data-testid="testCardsPaymentButton"]',
    );
    this.cancelLinkButton = this.testCards.locator(
      'button[data-testid="cancelLink"]',
    );
  }

  async chooseSuccess() {
    await this.success.click();
  }

  async clickPaymentButton() {
    await this.paymentButton.click();
  }
}
