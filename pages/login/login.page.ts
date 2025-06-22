import { expect, Locator, Page } from "@playwright/test";
import { WorkSpaceHomePage } from "../workspace/workspace-home.page";

export class LoginPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly continueButton: Locator;
  readonly passwordField: Locator;
  readonly goToWorkSpaceButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.getByRole("textbox", { name: "email" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.passwordField = page.getByRole("textbox", { name: "password" });
    this.goToWorkSpaceButton = page.getByRole("button", {
      name: "Go to workspace",
    });
  }

  async enterEmail(email: string) {
    await this.emailField.fill(email);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickGoToWorkspace() {
    await this.goToWorkSpaceButton.click();
  }

  async login(userName: string, password: string) {
    await this.enterEmail(userName);
    await this.clickContinue();
    await this.enterPassword(password);
    await this.clickGoToWorkspace();
    return new WorkSpaceHomePage(this.page);
  }

  async isContinueDisabled() {
    await expect(this.continueButton).toBeDisabled();
  }
}
