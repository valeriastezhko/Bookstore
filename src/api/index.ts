import axios from "axios";
import { API_URL } from "../conf";

export const client = axios.create({
  baseURL: API_URL,
});
