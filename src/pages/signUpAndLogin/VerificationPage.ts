import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import retry from 'async-retry';
import { config } from 'src/utils/config';
import { GettingStartedPage } from '../onboarding/GettingStartedPage';
import { getEmail } from '../../utils/mailJsClient';

export class VerificationPage extends BasePage {
  readonly verify: Locator;

  constructor(page: Page) {
    super(page);
    this.verify = page.getByRole('button', { name: /verify/i });
  }

  async getTokenFromEmailClient(
    email: string,
    password: string,
  ): Promise<string> {
    let message: string;

    await retry(async () => {
      try {
        //Get Message
        message = await getEmail(
          { username: email, password },
          'Verify your Intraverse email',
        );
        if (message === undefined) {
          throw new Error(`Cannot get Message: ${message} ---> Retry`);
        }
      } catch (e) {
        console.log(e);
        throw new Error('Submitting a new sign up failed ----> Retry');
      }
    }, config.RETRY_CONFIG);

    //Matcher to find 6 digit number
    const codeMatch: RegExpMatchArray = message.match(/\b\d{6}\b/);
    return codeMatch ? codeMatch[0] : null;
  }

  async enterToken(token: string) {
    const tokenArray: string[] = token.split('');
    await this.page.locator(`input[tabindex="${1}"]`).click();
    for (let i = 0; i < tokenArray.length; i++) {
      await this.page.fill(`input[tabindex="${i + 1}"]`, tokenArray[i]);
    }
  }

  async landOnPage() {
    await expect(this.verify).toBeVisible();
  }

  async submitToken() {
    await this.verify.click();
    const gettingStartedPage: GettingStartedPage = new GettingStartedPage(
      this.page,
    );
    await gettingStartedPage.landOnPage();
  }
}
