import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getContainerTypes = async () => {
  const response = await axios.get(`${BASE_URL}/containerTypes`);
  console.log(response.data);
  return response.data;
};
