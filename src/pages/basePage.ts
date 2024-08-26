import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  and() {
    return this;
  }

  async navigateToSubscription(page: Page, baseUrl: string) {
    await page.goto(baseUrl + '/settings/agency/subscription');
  }
}
