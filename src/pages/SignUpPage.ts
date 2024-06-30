// src/pages/SignUpPage.ts

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "src/fixtures/user";

export class SignUpPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneCode: Locator;
  readonly phoneNumber: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;
  readonly termsAndConditionCheckBox: Locator;
  readonly signUpWithEmail: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpWithEmail = page.getByText(/sign up with your email/i)
    this.firstNameInput = page.getByRole('textbox', { name: /first name/i })
    this.lastNameInput =  page.getByRole('textbox', { name: /last name/i })
    this.emailInput = page.getByRole('textbox', { name: /your email address/i })
    this.phoneCode = page.getByRole('textbox', { name: /phone code/i })
    this.phoneNumber = page.locator('input[name="phone"]')
    this.passwordInput = page.getByLabel('Your password')
    this.confirmPasswordInput = page.getByLabel('Confirm password');
    this.termsAndConditionCheckBox = page.getByRole('checkbox', { name: /I’ve read and agree with Intraverse/i });
    this.submitButton = page.getByRole('button', { name: /sign up/i })
  }

  async verifyPage(){
    await expect(this.signUpWithEmail).toBeVisible();
  }

  async clickSignUpWithEmail() {
    await this.signUpWithEmail.click()
  }

  async fillAndSubmitSignUpForm(user: User) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.phoneNumber.fill(user.phoneNumber);
    await this.passwordInput.fill(user.password);
    await this.confirmPasswordInput.fill(user.password);
    await this.termsAndConditionCheckBox.check();
    await this.submitButton.click();
  }

}
