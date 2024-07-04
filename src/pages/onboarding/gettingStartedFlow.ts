import { Page } from 'playwright';
import { expect } from 'playwright/test';

const activateBusinessLocators = {
  addbutton: /add/i,
  activateBusinessHeading: /activate business on intraverse/i,
};

export const verifyHeadingForActivateBusiness = async (page: Page) => {
  await expect(
    page.getByRole('heading', {
      name: activateBusinessLocators.activateBusinessHeading,
    }),
  ).toBeVisible();
};

export const clickAddButtonOnActivateBusiness = async (page: Page) => {
  await page
    .getByRole('button', {
      name: activateBusinessLocators.addbutton,
    })
    .first()
    .click();
};
