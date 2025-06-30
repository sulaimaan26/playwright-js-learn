import { test as base, expect } from "@playwright/test";
import { WorkSpaceHomePage } from "../pages/workspace/workspace-home.page";
import { LoginPage } from "../pages/login/login.page";
import { getEnv } from "../config/env.loader";
import { ENVKEY } from "../enums/env-key";
import { CreateWorkspacePage } from "../pages/workspace/create-workspace.page";
import { PeopleCount } from "../enums/workspace/people-count";
import { WorkspaceSettings } from "../pages/workspace/workspace-settings.page";
import { RandomData } from "../util/random-data.util";
import { WorkSpaceService } from "../services/workspace/workspace.service";
import { AuthProvider } from "../provider/auth.provider";

export const test = base.extend<{
  workspaceHome: WorkSpaceHomePage;
  createWorkspace: CreateWorkspacePage;
  workspaceSettings: {
    workspaceSettingPage: WorkspaceSettings;
    workSpaceName: string;
  };
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
      await workSpaceHomePage.header.clickMenu()
    ).clickCreateWorkspace();

    await use(createWorkspace);
  },

  workspaceSettings: async ({ page }, use) => {
    //Data setup from API
    let requestContext = await AuthProvider.getAuthRequest();
    let workSpaceService = new WorkSpaceService(requestContext);

    let name = "Fixture" + RandomData.getRandomString();
    let workspaceRes = await workSpaceService.createWorkspace({
      name,
      organization_size: PeopleCount.TWO_TEN,
      slug: name.toLowerCase(),
    });
    await expect(workspaceRes).toBeOK();

    await page.goto("/");
    let loginPage = new LoginPage(page);
    let workSpaceHomePage = await loginPage.login(
      getEnv(ENVKEY.EMAIL),
      getEnv(ENVKEY.PASSWORD)
    );

    //navigate to created workspace
    workSpaceHomePage = await (
      await workSpaceHomePage.header.clickMenu()
    ).selectWorkSpace(name);

    await workSpaceHomePage.isGreetingMessageDisplayed(getEnv(ENVKEY.USERNAME));

    let workspaceSettings = await (
      await workSpaceHomePage.header.clickMenu()
    ).clickSettingsButton();

    let result = {
      workspaceSettingPage: workspaceSettings,
      workSpaceName: name,
    };

    await use(result);

    //cleanup
    console.log("Deleting workspace: " + name);
    let deleteRes = await workSpaceService.deleteWorkspace(name.toLowerCase());
    await expect(deleteRes).toBeOK();
  },
});

export { expect } from "@playwright/test";
