// src/pages/VerificationPage.ts

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VerificationPage extends BasePage {
  readonly tokenInput: Locator[]; 
  readonly submitButton: Locator;
    readonly verify: Locator;


constructor(page: Page) {
    super(page);
    this.tokenInput = [
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(1) > input'),
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(2) > input'),
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(3) > input'),
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(4) > input'),
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(5) > input'),
        page.locator('#sandbox > div > div:nth-child(4) > div:nth-child(6) > input')
    ];
    this.submitButton = page.getByRole('button', { name: /verify/i });
    this.verify = page.getByRole('button', { name: /verify/i });
}


async enterToken(token: string) {
    const tokenArray = token.split('');
    for (let i = 0; i < tokenArray.length; i++) {
        await this.page.locator(this.tokenInput[i].toString()).fill(tokenArray[i].toString());
    }
}

async verifyPage() {
    await expect(this.verify).toBeVisible();
}

async submitToken() {
    await this.submitButton.click();

}

}