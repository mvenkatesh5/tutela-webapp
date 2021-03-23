// Base URLS
export const BASE_PROD = "https://tutelaotlp.herokuapp.com/";
export const BASE_STAGING = "https://tutelaotlp-staging.herokuapp.com/";
export const BASE_LOCAL = "http://127.0.0.1:8000/";

// authentication
export const AUTH_LOGIN = `/login/`;
export const AUTH_SIGNUP = `/signup/`;

// users
export const USER_ENDPOINT = `/api/users/`;
export const USER_WITH_ID_ENDPOINT = (user_id: Number) => `/api/users/${user_id}/`;

// news
export const NEWS_ENDPOINT = `/api/news/`;
export const NEWS_WITH_ID_ENDPOINT = (news_id: Number) => `/api/news/${news_id}`;

// adverts
export const ADVERTS_ENDPOINT = `/api/adverts/`;
export const ADVERTS_WITH_ID_ENDPOINT = (advert_id: Number) => `/api/adverts/${advert_id}/`;

// sessions
export const BULK_SESSION_ENDPOINT = `/api/sessions/bulk/`;
export const SESSION_ENDPOINT = `/api/tutela-sessions/`;
export const SESSION_ENDPOINT_TODAY = `/api/tutela-sessions/today/`;
export const SESSION_WITH_ID_ENDPOINT = (session_id: Number) =>
  `/api/tutela-sessions/${session_id}/`;
export const SESSION_USER_ENDPOINT = `/api/tutela-sessions-users/`;
export const SESSION_USER_WITH_ID_ENDPOINT = (session_id: Number) =>
  `/api/tutela-sessions-users/${session_id}/`;
export const ZOOM_MEETING_ENDPOINT = `/api/create-zoom-meeting/`;
export const ZOOM_ACCOUNT_STATUS_ENDPOINT = `/api/zoom/users-status/`;

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

// user messages
export const USER_MESSAGE_ENDPOINT = `/api/messages/`;
export const USER_MESSAGE_WITH_ID_ENDPOINT = (message_id: any) => `/api/messages/${message_id}/`;
export const USER_MESSAGE_WITH_STUDENT_ENDPOINT = (student_id: any) =>
  `/api/messages/?student=${student_id}`;
