// Base URLS
export const BASE_PROD = "https://tutelaotlp.herokuapp.com/";
export const BASE_STAGING = "https://tutelaotlp-staging.herokuapp.com/";
export const BASE_LOCAL = "http://localhost:8000/";
export const EDISON_ASSESSMENT_BASE_URL = `https://api.edison.cx/`;

// default urls
export const DEFAULT_ZOOM_URL = `https://zoom.us/j/2505542539?pwd=dXh0amx3TktJTEFTYk9OYUJ3YUNYUT09`;
export const S3_ENDPOINT = `/api/files/`;

// user report public endpoints
export const USER_REPORT_UUID_VERIFICATION = (uuid: any) => `/api/users/protected-reports/${uuid}/`;

// authentication
export const AUTH_LOGIN = `/login/`;
export const AUTH_SIGNUP = `/signup/`;
export const AUTH_SIGNOUT = `/signout/`;
export const FORGOT_PASSWORD = `/forgot-password/`;
export const RESET_PASSWORD = `/reset-password/`;

// session recording endpoints
export const ZOOM_RECORDINGS_ENDPOINT = `/api/zoom-recordings/fetch/`;
export const ZOOM_RECORDINGS_GO_ENDPOINT = `https://tutela.edison.video/api/download/`;

// users
export const USER_ENDPOINT = `/api/users/`;
export const USER_PAGINATION_ENDPOINT = `/api/users/paginations/`;
export const USER_WITH_ID_ENDPOINT = (user_id: any) => `/api/users/${user_id}/`;
export const USER_PRODUCT_RESOURCE_VIEW_ENDPOINT = (user_id: any) =>
  `/api/users/${user_id}/detail/`;
export const USER_PARENT_LINKING_ENDPOINT = `/api/user-linking/`;

// news
export const NEWS_ENDPOINT = `/api/news/`;
export const NEWS_WITH_ID_ENDPOINT = (news_id: Number) => `/api/news/${news_id}`;

// announcements
export const ANNOUNCEMENT_ENDPOINT = `/api/announcements/`;
export const ANNOUNCEMENT_USER_ENDPOINT = `/api/announcement/`;
export const ANNOUNCEMENT_WITH_ID_ENDPOINT = (announcement_id: Number) =>
  `/api/announcements/${announcement_id}`;

// adverts
export const ADVERTS_ENDPOINT = `/api/adverts/`;
export const ADVERTS_WITH_ID_ENDPOINT = (advert_id: Number) => `/api/adverts/${advert_id}/`;

// sessions
export const BULK_SESSION_ENDPOINT = `/api/sessions/bulk/`;
export const SESSION_ENDPOINT = `/api/tutela-sessions/`;
export const SESSION_ENDPOINT_TODAY = `/api/tutela-sessions/today/`;
export const SESSION_ENDPOINT_UPCOMING = `/api/upcoming-sessions/`;
export const SESSION_WITH_ID_ENDPOINT = (session_id: Number) =>
  `/api/tutela-sessions/${session_id}/`;
export const SESSION_UPDATE_ENDPOINT = `/api/sessions/update/`;
export const SESSION_BULK_UPDATE_ENDPOINT = `/api/sessions/update/`;
export const BULK_SESSION_DELETE_ENDPOINT = `/api/bulk-delete-sessions/`;
export const SESSION_USER_ENDPOINT = `/api/tutela-sessions-users/`;
export const SESSION_USER_WITH_ID_ENDPOINT = (session_id: Number) =>
  `/api/tutela-sessions-users/${session_id}/`;
export const ZOOM_MEETING_ENDPOINT = `/api/create-zoom-meeting/`;
export const ZOOM_ACCOUNT_STATUS_ENDPOINT = `/api/zoom/users-status/`;
// session assets
export const SESSION_ASSET_WITH_SESSION_ID_ENDPOINT = (session_id: any) =>
  `/api/sessions/${session_id}/details/`;
export const SESSION_ASSET_ENDPOINT = `/api/session-assets/`;
export const SESSION_ASSET_WITH_ID_ENDPOINT = (asset_id: any) => `/api/session-assets/${asset_id}/`;
export const UNRATED_SESSION_ENDPOINT = `/api/unrated-sessions/`;

// calendar sessions
export const USER_CALENDAR_SESSION_ENDPOINT = (date_query: any) =>
  `/api/sessions${date_query ? `?${date_query}` : `/`}`;

// communication (channel, threads, comments) service
export const CHANNEL_ENDPOINT = `/api/channels/`;
export const CHANNEL_WITH_ID_ENDPOINT = (channel_id: Number) => `/api/channels/${channel_id}/`;
export const THREAD_WITH_ID_ENDPOINT = (thread_id: Number) => `/api/threads/${thread_id}/`;
export const COMMENT_WITH_ID_ENDPOINT = (comment_id: Number) => `/api/comments/${comment_id}/`;

export const CHANNEL_WITH_THREAD_ENDPOINT = (channel_id: Number) =>
  `/api/channels/${channel_id}/threads/`;

export const CHANNEL_WITH_THREAD_COLLAPSE_ENDPOINT = (channel_id: Number) =>
  `/api/channels/${channel_id}/threads/collapse/`;

export const THREAD_WITH_COMMENT_ENDPOINT = (thread_id: Number) =>
  `/api/threads/${thread_id}/comments/`;

// user session
export const REQUEST_SESSION_ENDPOINT = `/api/request-sessions/`;
export const REQUEST_SESSION_WITH_ID_ENDPOINT = (req_id: any) => `/api/request-sessions/${req_id}/`;
export const REQUEST_SESSION_WITH_STATE_ENDPOINT = (state: any) =>
  `/api/request-sessions/?state=${state}`;

// user messages
export const USER_MESSAGE_ENDPOINT = `/api/messages/`;
export const USER_MESSAGE_WITH_ID_ENDPOINT = (message_id: any) => `/api/messages/${message_id}/`;
export const USER_MESSAGE_WITH_STUDENT_ENDPOINT = (student_id: any) =>
  `/api/messages/?student=${student_id}`;

// products
export const PRODUCTS_ENDPOINT = `/api/products/`;
export const PRODUCTS_WITH_ID_ENDPOINT = (product_id: any) => `/api/products/${product_id}/`;
export const USER_WITH_PRODUCT_ENDPOINT = ``;
// product users, resources binding
export const PRODUCT_USER_ENDPOINT = (product_id: any) => `/api/products/${product_id}/users/`;
export const PRODUCT_USER_DELETE_ENDPOINT = (user_bridge_id: any) =>
  `/api/products-users/${user_bridge_id}/`;
export const PRODUCT_RESOURCES_ENDPOINT = (product_id: any) =>
  `/api/products/${product_id}/resources/`;
// user side products
export const PRODUCTS_WITH_USER_ID_ENDPOINT = (user_id: any) => `/api/users/${user_id}/products/`;

// quick meetings
export const QUICK_MEETINGS_ENDPOINT = `/api/quick-meetings`;
export const QUICK_MEETINGS_WITH_ID_ENDPOINT = (quick_meeting_id: Number) =>
  `/api/quick-meetings/${quick_meeting_id}/`;

// resource endpoints
export const RESOURCE_CREATE_ENDPOINT = `/api/resources/tree/create/`;
export const RESOURCE_ENDPOINT = `/api/resources/`;
export const RESOURCE_NODE_ENDPOINT = (node_id: any) => `/api/resource-nodes/${node_id}/`;
export const RESOURCE_WITH_NODE_ENDPOINT = (node_id: any) => `/api/resources/tree/${node_id}/`;
export const RESOURCE_NODE_OPERATIONS_ENDPOINT = `/api/resources/tree/`;
export const USER_RESOURCE_VIEW_ENDPOINT = (user_id: any) => `/api/users/${user_id}/resources/`;
export const USER_RESOURCE_ENDPOINT = `/api/resources-users/`;
export const USER_RESOURCE_WITH_ID_ENDPOINT = (resource_id: any) =>
  `/api/resources-users/${resource_id}/`;
export const RESOURCE_ASSESSMENT_USER_ALLOCATION = (node_id: any) => `/api/users-nodes/${node_id}/`;
export const RESOURCE_ASSESSMENT_USER_DETAILS = (node_id: any) => `/api/students/nodes/${node_id}/`;

// notes
export const NOTES_ENDPOINT = `/api/notes/`;
export const NOTES_WITH_USER_ID_ENDPOINT = (user_id: any) => `/api/notes/?user=${user_id}`;
export const NOTES_WITH_ID_ENDPOINT = (notes_id: any) => `/api/notes/${notes_id}/`;
export const USER_NOTES_ENDPOINT = (resource_id: any, node_id: any) =>
  `/api/attaches/?user_resource_id=${resource_id}&node_id=${node_id}`;

// reports
export const USER_REPORTS_WITH_USER_ID_ENDPOINT = (user_id: any) =>
  `/api/users/reports/?user=${user_id}`;
export const USER_REPORT_WITH_PRODUCT_ID_ENDPOINT = (product_id: any) =>
  `/api/users/reports/?product=${product_id}`;
export const USER_PRODUCT_REPORTS = (user_id: any, product_id: any) =>
  `/api/users/reports/?user=${user_id}&product=${product_id}`;
export const USER_PRODUCT_ATTENDANCE = (product_id: any, user_id: any) =>
  `/api/product-report/${product_id}/?user=${user_id}`;
export const USER_REPORTS_ENDPOINT = `/api/users/reports/`;
export const USER_REPORTS_WITH_ID_ENDPOINT = (report_id: any) => `/api/users/reports/${report_id}/`;
export const MENTOR_REPORT_ENDPOINT = `/api/users/reports/mentors/`;

// tests
export const TESTS_ENDPOINT = `/api/tests/`;
export const TESTS_WITH_ID_ENDPOINT = (test_id: any) => `/api/tests/${test_id}/`;

// coins endpoint
export const USER_COINS_ENDPOINT = `/api/user-coins/`;

// doubts endpoints
export const DOUBTS_ENDPOINT = `/api/doubts/`;
export const DOUBTS_WITH_QUERY_ENDPOINT = (query: any) => `/api/doubts${query ? "/" + query : "/"}`;
export const DOUBTS_WITH_ID_ENDPOINT = (doubt_id: any) => `/api/doubts/${doubt_id}/`;
export const DOUBTS_WITH_REPLIES_ENDPOINT = (doubt_id: any) => `/api/doubts/${doubt_id}/replies/`;
export const DOUBTS_ID_WITH_REPLIES_ID_ENDPOINT = (doubt_id: any, reply_id: any) =>
  `/api/doubts/${doubt_id}/replies/${reply_id}/`;

// concern endpoints
export const ALL_CONCERNS_ENDPOINT = `/api/concerns/all/`;
export const CONCERN_ENDPOINT = `/api/concerns/`;
export const CONCERN_WITH_ID_ENDPOINT = (concern_id: any) => `/api/concerns/${concern_id}`;

export const COMMENT_WITH_CONCERN_ID_ENDPOINT = (concern_id: any) =>
  `/api/concerns/${concern_id}/comments/`;
export const CONCERN_ID_AND_COMMENT_ID_ENDPOINT = (concern_id: any, comment_id: any) =>
  `/api/concerns/${concern_id}/comments/${comment_id}/`;

// tags endpoints
export const TAGS_ENDPOINT = `/api/tags/`;
export const TAGS_WITH_ID_ENDPOINT = (tag_id: any) => `/api/tags/${tag_id}/`;

// teacher session feedback
export const TEACHER_SESSION_FEEDBACK_UN_REVIEWED_ENDPOINT = `/api/unreviewed-sessions/`;

// contacts
export const CONTACT_ENDPOINT = `/api/contacts/`;
export const CONTACT_WITH_ID_ENDPOINT = (contact_id: any) => `/api/contacts/${contact_id}/`;

//Edison assessment
export const EDISON_ASSESSMENT_ENDPOINT = `/api/receive-assessment-results/`;
export const AUTHENTICATE_EDISON_USER_ENDPOINT = `/api/authenticate-edison-user/`;

// doubts v2
export const V2_DOUBTS_ENDPOINT = `/api/doubts/`;
export const V2_DOUBT_WITH_ID_ENDPOINT = (doubt_id: string | number) => `/api/doubts/${doubt_id}/`;
export const V2_DOUBTS_PERSONAL_ENDPOINT = `/api/doubts/errorlog/`;
export const V2_DOUBTS_PUBLIC_ENDPOINT = `/api/doubts/asklog/`;
export const V2_COMMENTS_WITH_DOUBT_ID_ENDPOINT = (doubt_id: string | number) =>
  `/api/doubts/${doubt_id}/replies/`;

// teacher resource allocation
export const TEACHER_NODE_ENDPOINT = (resource_node_id: any) =>
  `/api/nodes/${resource_node_id}/teachers/`;
export const NODE_WITH_NODE_ID_AND_TEACHER_WITH_TEACHER_ID_ENDPOINT = (
  node_id: any,
  teacher_id: any
) => `/api/nodes/${node_id}/teachers/${teacher_id}`;
export const NODES_TEACHERS_ENDPOINT = `nodes/teachers/`;
export const NODES_WITH_TEACHER_ID_ENDPOINT = (teacher_id: any) =>
  `/api/nodes/teachers/${teacher_id}/`;

// session user report
export const SESSION_USER_REPORT_ENDPOINT = `/api/tutela-session-user-report/`;
export const SESSION_USER_REPORT_WITH_ID_ENDPOINT = (report_id: any) =>
  `/api/tutela-session-user-report/${report_id}/`;
export const SESSION_USER_REPORT_BULK_CREATE_ENDPOINT = `/api/tutela-session-user-report-bulk/`;
export const SESSION_USER_REPORT_BY_SESSION_USER_ID_ENDPOINT = (session_user_id: any) =>
  `/api/tutela-session/${session_user_id}/user-report/`;
