import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
});

export default instance;