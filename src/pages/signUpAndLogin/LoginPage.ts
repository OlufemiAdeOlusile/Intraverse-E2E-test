import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { SignUpPage } from './SignUpPage';

export class LoginPage extends BasePage {
  readonly signUp: Locator;

  constructor(page: Page) {
    super(page);
    this.signUp = page.getByRole('link', { name: /sign up/i });
  }

  async landOnPage() {
    await expect(this.signUp).toBeVisible();
  }

  async clickSignUp() {
    await this.signUp.click();
    await new SignUpPage(this.page).landOnPage();
  }
}
