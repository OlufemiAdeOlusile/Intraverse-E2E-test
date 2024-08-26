import { Page } from '@playwright/test';
import { clickByButton, ROLE_NAMES } from '../utils/dto';

const topHeader = {
  manageYourBusinessIconSelector: 'div.cursor-pointer div.rounded-full.w-9.h-9',
};

const lowerHeader = {
  subscriptionTab: /subscription/i,
  customersTab: /customers/i,
  ordersTab: /orders/i,
  dashboard: /dashboard/i,
  home: /home/i,
  myWebsite: /my website/i,
};

export const header = {
  async logout(page: Page) {
    await page.locator(topHeader.manageYourBusinessIconSelector).click();
    await clickByButton(page, /logout/i);
  },

  async verifySubscription(page: Page) {
    await page
      .getByRole(ROLE_NAMES.TAB, { name: lowerHeader.subscriptionTab })
      .waitFor({ state: 'visible' });
  },

  async verifyNoSubscription(page: Page) {
    await page
      .getByRole(ROLE_NAMES.TAB, { name: lowerHeader.subscriptionTab })
      .waitFor({ state: 'hidden' });
  },

  async verifyMyWebsite(page: Page) {
    await page
      .getByRole(ROLE_NAMES.TAB, { name: lowerHeader.myWebsite })
      .waitFor({ state: 'visible' });
  },
};
