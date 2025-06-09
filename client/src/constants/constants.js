const isProd = import.meta.env.PROD;

export const API_URL = isProd
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

export const API_TOKEN = isProd
  ? import.meta.env.VITE_API_TOKEN_PROD
  : import.meta.env.VITE_API_TOKEN_DEV;