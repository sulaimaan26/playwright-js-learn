import { test as base } from "@playwright/test";
import { WorkSpaceHomePage } from "../pages/workspace/workspace-home.page";
import { LoginPage } from "../pages/login/login.page";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";
import { CreateWorkspacePage } from "../pages/workspace/create-workspace.page";
import { PeopleCount } from "../enums/workspace/people-count";

export const test = base.extend<{
  workspaceHome: WorkSpaceHomePage;
  createWorkspace: CreateWorkspacePage;
}>({
  workspaceHome: async ({ page }, use) => {
    await page.goto("/");
    let loginPage = new LoginPage(page);
    let workSpaceHomePage = await loginPage.login(
      getEnv(ENVKEY.EMAIL),
      getEnv(ENVKEY.PASSWORD)
    );

    await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));
    await use(workSpaceHomePage);
  },

  createWorkspace: async ({ page }, use) => {
    await page.goto("/");
    let loginPage = new LoginPage(page);
    let workSpaceHomePage = await loginPage.login(
      getEnv(ENVKEY.EMAIL),
      getEnv(ENVKEY.PASSWORD)
    );
    await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));

    //navigate to create workspace
    let createWorkspace = await (
      await workSpaceHomePage.clickMenu()
    ).clickCreateWorkspace();

    await use(createWorkspace);
  },
});

export { expect } from "@playwright/test";
