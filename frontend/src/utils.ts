import { toast, TypeOptions } from "react-toastify";
export const API_URL = "https://taskmanager-backend-wine.vercel.app";
export const makingToast = (message: String, type: TypeOptions) => {
  toast(message, { type: type });
};
