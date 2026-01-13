import { BASE_URL } from "@/constants/constants";
import axios from "axios";

export const getTags = async (): Promise<{ name: string }[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
};
