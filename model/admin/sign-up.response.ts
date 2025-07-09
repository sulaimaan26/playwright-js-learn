export interface SignUpResponse {
    id:                       string;
    created_at:               Date;
    updated_at:               Date;
    theme:                    Theme;
    is_tour_completed:        boolean;
    onboarding_step:          OnboardingStep;
    use_case:                 string;
    role:                     string;
    is_onboarded:             boolean;
    last_workspace_id:        null;
    billing_address_country:  string;
    billing_address:          null;
    has_billing_address:      boolean;
    company_name:             string;
    is_smooth_cursor_enabled: boolean;
    is_mobile_onboarded:      boolean;
    mobile_onboarding_step:   OnboardingStep;
    mobile_timezone_auto_set: boolean;
    language:                 string;
    start_of_the_week:        number;
    user:                     string;
}

export interface OnboardingStep {
    workspace_join:    boolean;
    profile_complete:  boolean;
    workspace_create:  boolean;
    workspace_invite?: boolean;
}

export interface Theme {
}
