import { faker } from "@faker-js/faker";
import { expect, test } from "../../fixtures/home-page.fixture";

//TODO: Add proper delete project post cleanup
test("Check whether able to create project and delete it", async ({
  workspaceHome,
}) => {
  const workspaceHomePage = workspaceHome.workspaceHomePage;
  //Arrange
  let tempProjectId = faker.string.alpha(3);
  let name = "Tempproject" + tempProjectId.toLowerCase();
  let testDescription = "This is for testing";

  //ACT
  let projectHome = await workspaceHomePage.sideMenuSection.clickProjectMenu();
  let createProjectPopup = await projectHome.clickAddProject();
  let alertPopup = await createProjectPopup.createProject({
    name,
    projectId: tempProjectId,
    description: testDescription,
  });

  //Assert
  await alertPopup.isExpectedMessageDisplayed("Project created successfully");
  projectHome = await createProjectPopup.clickClose();
  const projectSettings = await projectHome.navigateToSettings(name);
  let info = await projectSettings.getProjectInfo();
  expect(info.projectName).toEqual(name);
  expect(info.projectId.toLowerCase()).toEqual(tempProjectId.toLowerCase());
  expect(info.description).toEqual(testDescription);

  //Delete Operation
  alertPopup = await projectSettings.handleDeleteProject(name);
  await alertPopup.isExpectedMessageDisplayed("Project deleted successfully");
});
