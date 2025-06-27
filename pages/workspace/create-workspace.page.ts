import { Page, Locator, expect } from "@playwright/test";
import { Dropdown } from "../../component/dropdown";
import { AlertNotification } from "../../component/alert-notification";
import { PeopleCount } from "../../enums/workspace/people-count";

export class CreateWorkspacePage {
  private readonly page: Page;
  private readonly workspaceNameField: Locator;
  private readonly workspaceURLField: Locator;
  private readonly peopleCountDropdown: Dropdown;
  private readonly createWorkspaceButton: Locator;
  private readonly goBackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workspaceNameField = page.locator("#workspaceName");
    this.workspaceURLField = page.locator("#workspaceUrl");
    this.createWorkspaceButton = page.getByRole("button", {
      name: "Create workspace",
    });
    this.peopleCountDropdown = new Dropdown(
      page.getByRole("button", {
        name: "Select a range",
      }),
      page
    );
    this.goBackButton = page.getByRole("button", { name: "Go back" });
  }

  async enterWorkspaceName(name: string) {
    await this.workspaceNameField.fill(name);
  }

  async enterWorkspaceURL(name: string) {
    await this.workspaceURLField.fill(name);
  }

  async selectPeopleCount(option: PeopleCount) {
    await this.peopleCountDropdown.selectOption(option);
  }

  async clickCreateWorkspace() {
    await this.createWorkspaceButton.click();
  }

  async createWorkspace(name: string, peopleCount: PeopleCount) {
    await this.enterWorkspaceName(name);
    await this.enterWorkspaceURL(name);
    await this.selectPeopleCount(peopleCount);
    await this.clickCreateWorkspace();
    return new AlertNotification(this.page);
  }

  async isCreateWorkspaceButtonEnabled() {
    await expect(this.createWorkspaceButton).toBeEnabled();
  }

  async isCreateWorkspaceButtonDisabled() {
    await expect(this.createWorkspaceButton).toBeDisabled();
  }

  async isUserMailDisplayed(mail: string) {
    await expect(this.page.getByText(mail)).toBeVisible();
  }

  async isFieldErrorMessageDisplayed(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }

  async goBack() {
    await this.goBackButton.click();
  }
}
