import { expect, Locator, Page } from '@playwright/test';
import { SettingsPage } from '../settingsPage';
import { ROLE_NAMES } from '../../../utils/dto';
import { getLogoFilePath } from '../../../utils/utility';
import { FileChooser } from 'playwright';

export class BrandPage extends SettingsPage {
  readonly logoHeading: Locator;
  readonly addIcon: Locator;
  readonly saveIcon: Locator;
  readonly saveChanges: Locator;
  readonly profileUpdatedAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.logoHeading = page.getByRole(ROLE_NAMES.HEADING, { name: /logo/i });
    this.addIcon = page.locator('[data-testid="AddIcon"]');
    this.saveIcon = page.getByRole(ROLE_NAMES.BUTTON, {
      name: 'Save',
      exact: true,
    });
    this.saveChanges = page.getByRole(ROLE_NAMES.BUTTON, {
      name: 'Save Changes',
    });
    this.profileUpdatedAlert = page.getByText('Profile Updated');
  }

  async landOnPage() {
    await expect(this.logoHeading).toBeVisible();
  }

  async uploadLogoImage() {
    const absoluteFilePath: string = getLogoFilePath();
    const fileChooserPromise: Promise<FileChooser> =
      this.page.waitForEvent('filechooser');
    await this.addIcon.click();
    const fileChooser: FileChooser = await fileChooserPromise;
    await fileChooser.setFiles(absoluteFilePath);
    await this.saveIcon.click();
    await this.saveChanges.click();
    await expect(this.profileUpdatedAlert).toBeVisible();
  }
}
