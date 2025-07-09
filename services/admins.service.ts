import { APIRequestContext } from "@playwright/test";
import { SignUpRequest } from "../model/admin/sign-up.request";
import { IAPIResponse } from "../model/api-response";
import { UpdateProfileRequest } from "../model/admin/update-profile.request";
import { SignUpResponse } from "../model/admin/sign-up.response";
import { UpdateMeResponse } from "../model/admin/path-me.response";

export class AdminService {
  constructor(private request: APIRequestContext) {}

  async signUpAdminUser(data: SignUpRequest): Promise<IAPIResponse<void>> {
    // /api/instances/admins/sign-up/
    const response = await this.request.fetch(`/api/instances/admins/sign-up/`, {
      method: "POST",
      maxRedirects: 0,
      multipart: {
        ...data,
      },
    });

    return response;
  }

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
