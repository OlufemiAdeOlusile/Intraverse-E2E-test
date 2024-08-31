import { BasePage } from '../basePage';
import { expect, Locator, Page } from '@playwright/test';
import { ROLE_NAMES } from '../../utils/dto';

export class OffersPage extends BasePage {
  readonly editSearch: Locator;

  constructor(page: Page) {
    super(page);
    this.editSearch = page.getByRole(ROLE_NAMES.BUTTON, {
      name: /edit search/i,
    });
  }

  async landOnPage() {
    await expect(this.editSearch).toBeVisible();
  }
}
