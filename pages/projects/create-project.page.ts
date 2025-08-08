import { Locator, Page } from "@playwright/test";
import { AlertNotification } from "../../component/alert-notification";
import { ProjectHomePage } from "./project-home.page";

export class CreateProjectPopup {
  projectNameField: Locator;
  projectIdField: Locator;
  descriptionField: Locator;
  createProjectButton: Locator;
  openProjectButton: Locator;
  closeButton: Locator;

  constructor(private page: Page) {
    this.projectNameField = page.getByRole("textbox", { name: "Project name" });
    this.projectIdField = page.getByRole("textbox", { name: "Project ID" });
    this.descriptionField = page.getByRole("textbox", { name: "Description" });
    this.createProjectButton = page.getByRole("button", {
      name: "Create project",
    });
    this.openProjectButton = page.getByRole("link", {
      name: "Open project",
    });
    this.closeButton = page.getByRole("button", {
      name: "Close",
    });
  }

  async enterProjectName(name: string) {
    await this.projectNameField.fill(name);
  }

  async enterProjectId(name: string) {
    await this.projectIdField.fill(name);
  }

  async enterDescription(name: string) {
    await this.descriptionField.fill(name);
  }

  async clickCreateProject() {
    await this.createProjectButton.click();
  }

  async clickOpenProject() {
    await this.openProjectButton.click();
  }

  async createProject(arg: {
    name: string;
    projectId: string;
    description?: string;
  }) {
    await this.enterProjectName(arg.name);
    await this.enterProjectId(arg.projectId);
    if (arg.description) await this.enterDescription(arg.description);
    await this.clickCreateProject();
    return new AlertNotification(this.page);
  }

  async clickClose() {
    await this.closeButton.click();
    return new ProjectHomePage(this.page);
  }
}
