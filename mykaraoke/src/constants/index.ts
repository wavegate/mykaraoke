const API_URL = import.meta.env.PROD
  ? "http://54.200.165.61"
  : import.meta.env.DEV
  ? "http://localhost:3000"
  : "";
export { API_URL };
