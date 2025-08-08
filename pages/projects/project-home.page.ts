import { Locator, Page } from "@playwright/test";
import { CreateProjectPopup } from "./create-project.page";
import { ProjectSettings } from "./project-settings.page";

export class ProjectHomePage {
  private readonly addProjectButton: Locator;
  private readonly searchIcon: Locator;
  private readonly searchInput: Locator;
  private readonly settingsIcon: Locator;

  constructor(private page: Page) {
    this.addProjectButton = page.getByRole("button", { name: "Add Project" });
    this.searchIcon = page
      .locator("div")
      .filter({ hasText: /^Created dateFiltersAdd ProjectProject$/ })
      .getByRole("button")
      .first(); //this element has no proper locators used this from playwright locator
    this.searchInput = page
      .locator("div")
      .filter({ hasText: /^Created dateFiltersAdd ProjectProject$/ })
      .getByPlaceholder("Search");
    this.settingsIcon = page.getByRole("link", { name: "settings" }).first();
  }

  async navigateToProject(name: string) {
    await this.searchProject(name);
    await this.page.getByRole("link", { name }).click();
  }

  async navigateToSettings(name: string) {
    await this.searchProject(name);
    await this.page.getByRole("link", { name }).getByRole("link").click();
    return new ProjectSettings(this.page);
  }

  async clickAddProject() {
    await this.addProjectButton.click();
    return new CreateProjectPopup(this.page);
  }

  async searchProject(name: string) {
    await this.searchIcon.click();
    await this.searchInput.click();
    await this.searchInput.fill(name);
  }
}
