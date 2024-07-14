import { Locator, Page } from '@playwright/test';

export const ROLE_NAMES = {
  TEXT_BOX: 'textbox',
  BUTTON: 'button',
  HEADING: 'heading',
  COMBO_BOX: 'combobox',
  LINK: 'link',
  TAB: 'tab',
} as const;

export const getByButton = async (page: Page, regex: RegExp) => {
  return page.getByRole(ROLE_NAMES.BUTTON, { name: regex });
};

export const getByLink = async (page: Page, regex: RegExp) => {
  return page.getByRole(ROLE_NAMES.LINK, { name: regex });
};

export const getByHeading = async (page: Page, regex: RegExp) => {
  return page.getByRole(ROLE_NAMES.HEADING, { name: regex });
};
export const getByTextBox = async (page: Page, regex: RegExp) => {
  return page.getByRole(ROLE_NAMES.TEXT_BOX, { name: regex });
};

export const fillByRoleTextBox = async (
  page: Page,
  regex: RegExp,
  text: string,
): Promise<void> => {
  const byTextBox: Locator = await getByTextBox(page, regex);
  await byTextBox.clear();
  await byTextBox.fill(text);
};

export const fillBySelector = async (
  page: Page,
  selector: string,
  text: string,
): Promise<void> => {
  const bySelector: Locator = await page.locator(selector);
  await bySelector.clear();
  await bySelector.fill(text);
};

export const clickByButton = async (
  page: Page,
  regex: RegExp,
): Promise<void> => {
  await (await getByButton(page, regex)).click();
};

export const clickByLink = async (page: Page, regex: RegExp): Promise<void> => {
  await (await getByLink(page, regex)).click();
};

export const verifyTextViaTextSelector = async (
  page: Page,
  selectorString: string,
): Promise<void> => {
  await page.waitForSelector(selectorString);
  const selector: string = await page.textContent(selectorString);

  if (selector) {
    console.log(`Message using dynamic selector: ${selectorString}`);
  } else {
    throw new Error(
      `No message found using dynamic selector: ${selectorString}`,
    );
  }
};

export const chooseFromDropDownByRole = async (
  page: Page,
  regex: RegExp,
  value: string,
): Promise<void> => {
  await page.getByRole(ROLE_NAMES.COMBO_BOX, { name: regex }).click();
  const optionSelector: string = `li:has-text("${value}")`;
  const optionLocator: Locator = page.locator(optionSelector);
  await optionLocator.waitFor();
  await optionLocator.scrollIntoViewIfNeeded();
  await optionLocator.click();
};

export const verifyTextByRole = async (page: Page, text: string) => {
  const regex: RegExp = new RegExp(text.toLowerCase(), 'i');
  await page.getByText(regex).waitFor({ state: 'visible' });
};
