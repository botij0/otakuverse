import axios from "axios";

const jikanApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export { jikanApi };
