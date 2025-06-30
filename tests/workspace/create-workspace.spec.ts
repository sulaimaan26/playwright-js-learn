import { getEnv } from "../../config/env.loader";
import {
  WorkSpaceNameFieldInvalidData,
  WorkSpaceNameFieldValidData,
} from "../../data/workspace/create-workspace-data";
import { ENVKEY } from "../../enums/env-key";
import { TestTags } from "../../enums/test-tags";
import { PeopleCount } from "../../enums/workspace/people-count";
import { expect, test } from "../../fixtures/home-page.fixture";
import { RandomData } from "../../util/random-data.util";

const workspaceHost = getEnv(ENVKEY.WORKSPACE_HOST);

test(
  "Check whether user able to create a workspace and delete it",
  { tag: [TestTags.POSITIVE, TestTags.PRIORITY_HIGH, TestTags.EndToEnd] },
  async ({ workspaceHome }) => {
    //creating workspace
    let createWorkspace = await (
      await workspaceHome.header.clickMenu()
    ).clickCreateWorkspace();
    let workspaceName = "temp";
    let peopleCount = PeopleCount.TWO_TEN;
    let alertMessage = await createWorkspace.createWorkspace(
      workspaceName,
      peopleCount
    );
    await alertMessage.isExpectedMessageDisplayed(
      "Workspace created successfully"
    );

    let workspaceSettings = await (
      await workspaceHome.header.clickMenu()
    ).clickSettingsButton();

    //Getting workspace info for future assertion
    let workspaceInfo = await workspaceSettings.getWorkSpaceInfo();

    //deleting workspace
    let deleteAlertMessage = await workspaceSettings.handleDeleteWorkspace(
      workspaceName
    );
    await deleteAlertMessage.isExpectedMessageDisplayed("Workspace deleted.");

    //Assereting created data
    expect(workspaceInfo.workspaceName).toEqual(workspaceName);
    expect(workspaceInfo.companySize).toEqual(peopleCount);
    expect(workspaceInfo.workspaceUrl).toEqual(workspaceHost + workspaceName);
  }
);

test(
  "Verify logged in user mail displayed in create-workspace page",
  { tag: [TestTags.POSITIVE, TestTags.PRIORITY_MEDIUM] },
  ({ createWorkspace }) => {
    createWorkspace.isUserMailDisplayed(getEnv(ENVKEY.EMAIL));
  }
);

//TODO: Convert workspace creation to API
test("Verify whether there is proper message for  a workspace created with duplicate url", async ({
  workspaceSettings,
}) => {
  const workspaceSettingsPage =workspaceSettings.workspaceSettingPage
  const workspaceName  =workspaceSettings.workSpaceName
  //creating workspace
  // let createWorkspace = await (
  //   await workspaceHome.header.clickMenu()
  // ).clickCreateWorkspace();
  // let workspaceName = "duplicate-work" + RandomData.getRandomString(3);
  // let alertMessage = await createWorkspace.createWorkspace(
  //   workspaceName,
  //   PeopleCount.TWO_TEN
  // );
  // await alertMessage.isExpectedMessageDisplayed(
  //   "Workspace created successfully"
  // );

  const createWorkspace = await (
    await workspaceSettingsPage.header.clickMenu()
  ).clickCreateWorkspace();

  await createWorkspace.enterWorkspaceName(workspaceName);
  await createWorkspace.selectPeopleCount(PeopleCount.TWO_TEN);
  await createWorkspace.clickCreateWorkspace();
  await createWorkspace.isFieldErrorMessageDisplayed(
    "Workspace URL is already taken!"
  );
  // await createWorkspace.goBack();

  //post-cleanup
  //TODO: Convert post-cleanup to API
  // let workspaceSettings = await (
  //   await workspaceHome.header.clickMenu()
  // ).clickSettingsButton();
  // let deleteAlertMessage = await workspaceSettings.handleDeleteWorkspace(
  //   workspaceName
  // );
  // await deleteAlertMessage.isExpectedMessageDisplayed("Workspace deleted.");
});

test.describe.parallel("Workspace name validation", () => {
  WorkSpaceNameFieldValidData.forEach((name) => {
    test(
      `Verify Workspace names can contain only (' '), ('-'), ('_') and alphanumeric characters for valid data - ${name}`,
      { tag: [TestTags.POSITIVE, TestTags.PRIORITY_LOW] },
      async ({ createWorkspace }) => {
        await createWorkspace.enterWorkspaceName(name);
        await createWorkspace.selectPeopleCount(PeopleCount.TWO_TEN);
        await createWorkspace.enterWorkspaceURL(workspaceHost + "rand");
        await createWorkspace.isCreateWorkspaceButtonEnabled();
      }
    );
  });

  WorkSpaceNameFieldInvalidData.forEach((name) => {
    test(
      `Verify Workspace names can contain only (' '), ('-'), ('_') and alphanumeric characters for Invalid data - ${name}`,
      { tag: [TestTags.NEGATIVE, TestTags.PRIORITY_LOW] },
      async ({ createWorkspace }) => {
        await createWorkspace.enterWorkspaceName(name);
        await createWorkspace.selectPeopleCount(PeopleCount.TWO_TEN);
        await createWorkspace.enterWorkspaceURL(workspaceHost + "rand");
        await createWorkspace.isCreateWorkspaceButtonDisabled();
      }
    );
  });
});
