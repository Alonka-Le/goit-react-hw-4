import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const API_KEY = "j7KREmx57rDC9GV5z8ZPDh25pUoqfyKxKoxzmOgnzUg";
export const fetchImg = async (query, page) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: API_KEY,
      query: query,
      page: page,
      per_page: 12,
    },
  });

  return response.data;
};
