// src/pages/SignUpPage.ts

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = page.getByAltText('Name'); // Adjust selector as needed
    this.emailInput = page.getByAltText('Email'); // Adjust selector as needed
    this.passwordInput = page.getByAltText('Password'); // Adjust selector as needed
    this.confirmPasswordInput = page.getByAltText('Confirm Password'); // Adjust selector as needed
    this.submitButton = page.getByRole('button', { name: /sign up/i }); // Adjust selector as needed
  }

  async fillSignUpForm(name: string, email: string, password: string) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
