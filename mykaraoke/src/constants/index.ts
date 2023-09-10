const API_URL = import.meta.env.PROD
  ? "https://jobapptracker.net"
  : import.meta.env.DEV
  ? "https://jobapptracker.net"
  : "";
export { API_URL };
