import { BasePage } from '../basePage';
import { Locator, Page } from '@playwright/test';

export class SettingsPage extends BasePage {
  readonly goBackButton: Locator;

  constructor(page: Page) {
    super(page);
    this.goBackButton = page.getByText('Go back');
  }

  async clickGoBack() {
    await this.goBackButton.click();
  }
}
