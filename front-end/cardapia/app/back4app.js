export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const HEADERS = {
  "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
  "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
  "Content-Type": "application/json",
};