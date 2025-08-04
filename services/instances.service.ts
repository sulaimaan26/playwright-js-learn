import { APIRequestContext } from "@playwright/test";
import { SignUpRequest } from "../model/admin/sign-up.request";
import { IAPIResponse } from "../model/api-response";

export class InstancesService {
  constructor(private request: APIRequestContext) {}

  async signUp(data: SignUpRequest): Promise<IAPIResponse<void>> {
    const response = await this.request.fetch(
      `/api/instances/admins/sign-up/`,
      {
        method: "POST",
        maxRedirects: 0,
        multipart: {
          ...data,
        },
      }
    );

    return response;
  }

  async signIn(
    request: APIRequestContext,
    formData: {
      csrfmiddlewaretoken: string;
      email: string;
      password: string;
    }
  ): Promise<IAPIResponse<void>> {
    return request.fetch(`/api/instances/admins/sign-in/`, {
      method: "POST",
      maxRedirects: 0,
      form: formData,
    });
  }
}
