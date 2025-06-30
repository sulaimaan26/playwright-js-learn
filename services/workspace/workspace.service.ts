import { APIRequestContext } from "@playwright/test";
import { IAPIResponse } from "../../model/api-response";
import { EmailCheckResponse } from "../../model/auth/email-check.response";
import { MeResponse } from "../../model/auth/me.response";
import { CreateWorkspaceRequest } from "../../model/workspace/create-workspace.request";
import { CreateWorkspaceResponse } from "../../model/workspace/create-workspace.response";

export class WorkSpaceService {
  constructor(private request: APIRequestContext) {}

  async getMe(): Promise<IAPIResponse<MeResponse>> {
    return this.request.get(
      `/api/workspaces/my-workspace/workspace-members/me/`
    );
  }

  async createWorkspace(
    createWorkspaceRequest: CreateWorkspaceRequest
  ): Promise<IAPIResponse<CreateWorkspaceResponse>> {
    return this.request.post(`/api/workspaces/`, {
      data: createWorkspaceRequest,
    });
  }

  async deleteWorkspace(workspaceName: string): Promise<IAPIResponse<void>> {
    return this.request.delete(`/api/workspaces/${workspaceName}`);
  }
}
