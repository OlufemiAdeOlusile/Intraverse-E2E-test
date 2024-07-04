import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { User } from 'src/fixtures/user';

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

  async fillAndSubmitSignInForm(user: User) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }
}
