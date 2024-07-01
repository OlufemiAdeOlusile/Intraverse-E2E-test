import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { getInboxId, getMessageText } from "src/utils/emailClient";

export class VerificationPage extends BasePage {
  readonly verify: Locator;


constructor(page: Page) {
    super(page);
    this.verify = page.getByRole('button', { name: /verify/i });
}

async getTokenFromEmailClient(email: string): Promise<string>{
    await this.page.waitForTimeout(10000)
    const messageId: string = await getInboxId(email, 'Verify your Intraverse email');
    await this.page.waitForTimeout(1000)
    const message: string = await getMessageText(email, messageId);
    const codeMatch = message.match(/\b\d{6}\b/);
    return codeMatch ? codeMatch[0] : null;
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