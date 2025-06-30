import { TestTags } from "../../enums/test-tags";
import { PeopleCount } from "../../enums/workspace/people-count";
import { test } from "../../fixtures/home-page.fixture";
import { RandomData } from "../../util/random-data.util";

test(
  "Check whether user able to update workspace",
  { tag: [TestTags.PRIORITY_HIGH, TestTags.POSITIVE] },
  async ({ workspaceSettings, page }) => {
    const workSpaceSettingPage = workspaceSettings.workspaceSettingPage;
    let updatedWokspaceName = "work" + RandomData.getRandomString();
    await workSpaceSettingPage.enterWorkspaceName(updatedWokspaceName);
    await workSpaceSettingPage.selectCompanySize(PeopleCount.TWO_TEN);
    let alertNotification = await workSpaceSettingPage.updateWorkspace();
    await alertNotification.isExpectedMessageDisplayed(
      "Workspace updated successfully"
    );
    await page.reload();
  }
);

test(
  "Check whether Workspace URL field is not editable",
  { tag: [TestTags.PRIORITY_LOW, TestTags.POSITIVE] },
  async ({ workspaceSettings }) => {
    const workSpaceSettingPage = workspaceSettings.workspaceSettingPage;

    await workSpaceSettingPage.isWorkspaceURLDisabled();
  }
);
