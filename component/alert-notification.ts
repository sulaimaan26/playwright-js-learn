import { expect, Locator, Page } from "@playwright/test";

export class AlertNotification {
  private page: Page;
  private alertSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alertSection = page.locator(`[data-sonner-toast]`);
  }

  async isExpectedMessageDisplayed(message: string) {
    await this.alertSection.waitFor({ state: "visible" });
    await expect(this.page.getByText(message), {
      message: "Required message not found ",
    }).toBeVisible();
  }
}
