import { APIRequestContext } from "@playwright/test";
import { UpdateMeResponse } from "../model/admin/path-me.response";
import { SignUpResponse } from "../model/admin/sign-up.response";
import { UpdateProfileRequest } from "../model/admin/update-profile.request";
import { IAPIResponse } from "../model/api-response";

export class UserService {
  constructor(private request: APIRequestContext) {}

  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<IAPIResponse<SignUpResponse>> {
    const response = await this.request.patch(`/api/users/me/profile/`, {
      data,
    });

    return response;
  }

  async updateMe(data: {
    first_name: string;
    last_name: string;
  }): Promise<IAPIResponse<UpdateMeResponse>> {
    const response = await this.request.patch(`/api/users/me/`, {
      data,
    });

    return response;
  }

  async updateTourStatus(
    is_tour_completed = true
  ): Promise<IAPIResponse<{ message: string }>> {
    const response = await this.request.patch(`/api/users/me/tour-completed/`, {
      data: { is_tour_completed },
    });

    return response;
  }
}
