import { toast, TypeOptions } from "react-toastify";
export const API_URL = "http://localhost:8080";
export const makingToast = (message: String, type: TypeOptions) => {
  toast(message, { type: type });
};
