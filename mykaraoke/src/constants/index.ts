const API_URL = import.meta.env.PROD
  ? "https://jobapptracker.net"
  : import.meta.env.DEV
  ? "http://localhost:3000"
  : "";

export { API_URL };
