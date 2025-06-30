export interface MeResponse {
    id:                string;
    draft_issue_count: number;
    created_at:        Date;
    updated_at:        Date;
    deleted_at:        null;
    role:              number;
    company_role:      string;
    view_props:        Props;
    default_props:     Props;
    issue_props:       IssueProps;
    is_active:         boolean;
    created_by:        string;
    updated_by:        string;
    workspace:         string;
    member:            string;
}

export interface Props {
    filters:            Filters;
    display_filters:    DisplayFilters;
    display_properties: { [key: string]: boolean };
}

export interface DisplayFilters {
    type:                null;
    layout:              string;
    group_by:            null;
    order_by:            string;
    sub_issue:           boolean;
    show_empty_groups:   boolean;
    calendar_date_range: string;
}

export interface Filters {
    state:       null;
    labels:      null;
    priority:    null;
    assignees:   null;
    created_by:  null;
    start_date:  null;
    subscriber:  null;
    state_group: null;
    target_date: null;
}

export interface IssueProps {
    created:    boolean;
    assigned:   boolean;
    all_issues: boolean;
    subscribed: boolean;
}
