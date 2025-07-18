export interface UpdateMeResponse {
    last_login:          Date;
    id:                  string;
    username:            string;
    mobile_number:       null;
    email:               string;
    display_name:        string;
    first_name:          string;
    last_name:           string;
    avatar:              string;
    avatar_asset:        null;
    cover_image:         null;
    cover_image_asset:   null;
    date_joined:         Date;
    created_at:          Date;
    updated_at:          Date;
    last_location:       string;
    created_location:    string;
    is_superuser:        boolean;
    is_managed:          boolean;
    is_password_expired: boolean;
    is_active:           boolean;
    is_staff:            boolean;
    is_email_verified:   boolean;
    is_password_autoset: boolean;
    token:               string;
    last_active:         Date;
    last_login_time:     Date;
    last_logout_time:    null;
    last_login_ip:       string;
    last_logout_ip:      string;
    last_login_medium:   string;
    last_login_uagent:   string;
    token_updated_at:    Date;
    is_bot:              boolean;
    bot_type:            null;
    user_timezone:       string;
    is_email_valid:      boolean;
    masked_at:           null;
}
