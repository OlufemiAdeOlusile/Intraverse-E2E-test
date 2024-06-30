import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class VerificationPage extends BasePage {
  readonly verify: Locator;


constructor(page: Page) {
    super(page);
    this.verify = page.getByRole('button', { name: /verify/i });
}


async enterToken(token: string) {
    const tokenArray: string[] = token.split('');
    await this.page.locator(`input[tabindex="${1}"]`).click()
    for (let i = 0; i < tokenArray.length; i++) {
        await this.page.fill(`input[tabindex="${i+ 1}"]`, tokenArray[i])
    }
}

async verifyPage() {
    await expect(this.verify).toBeVisible();
}

async submitToken() {
    await this.verify.click();
}

}