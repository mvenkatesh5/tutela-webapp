// Base URLS
export const BASE_PROD = "https://tutelaotp.herokuapp.com/";
export const BASE_STAGING = "https://tutelaotp-staging.herokuapp.com/";
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
export const ADVERTS_WITH_ID_ENDPOINT = (advert_id: Number) => `/api/adverts/${advert_id}`;

// sessions
export const SESSION_ENDPOINT = `/api/tutela-sessions/`;
export const SESSION_WITH_ID_ENDPOINT = (session_id: Number) =>
  `/api/tutela-sessions/${session_id}`;
export const SESSION_USER_ENDPOINT = `/api/tutela-sessions-users/`;
export const ZOOM_MEETING_ENDPOINT = `/api/create-zoom-meeting/`;

// calendar sessions
export const USER_CALENDAR_SESSION_ENDPOINT = (date_query: any) =>
  `/api/sessions${date_query ? `?${date_query}` : `/`}`;
