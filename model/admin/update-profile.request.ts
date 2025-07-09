export interface UpdateProfileRequest {
  use_case?: string;
  role?: string;
  onboarding_step?: {
    profile_complete: boolean;
    workspace_create: boolean;
    workspace_invite: boolean;
    workspace_join: boolean;
  };
}
