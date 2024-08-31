import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../basePage';
import { PASSWORD } from 'src/fixtures/user';
import { Profile } from '../../types/api/user/getProfile';

export class LoginPage extends BasePage {
  readonly signUp: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signUp = page.getByRole('link', { name: /sign up/i });
    this.emailInput = page.getByRole('textbox', { name: /email/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.submitButton = page.getByRole('button', { name: /login/i });
  }

  async landOnPage() {
    await expect(this.signUp).toBeVisible();
  }

  async clickSignUp() {
    await this.signUp.click();
  }

  async loginUser(user: Profile) {
    await this.emailInput.fill(user.data.account.email);
    await this.passwordInput.fill(PASSWORD);
    await this.submitButton.click();
  }
}
