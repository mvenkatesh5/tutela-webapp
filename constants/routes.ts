// Base URLS
export const BASE_PROD = "https://tutelaotp.herokuapp.com/";
export const BASE_STAGING = "https://tutelaotp-staging.herokuapp.com/";
export const BASE_LOCAL = "http://127.0.0.1:8000/";

// authentication
export const AUTH_LOGIN = `/login/`;
export const AUTH_SIGNUP = `/signup/`;

// news
export const NEWS_ENDPOINT = `/api/news/`;
export const NEWS_WITH_ID_ENDPOINT = (news_id: Number) => `/api/news/${news_id}`;

// adverts
export const ADVERTS_ENDPOINT = `/api/adverts/`;
export const ADVERTS_WITH_ID_ENDPOINT = (advert_id: Number) => `/api/adverts/${advert_id}`;
