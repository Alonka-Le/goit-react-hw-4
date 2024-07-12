import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const API_KEY = "j7KREmx57rDC9GV5z8ZPDh25pUoqfyKxKoxzmOgnzUg";
export const fetchImg = async (query, page) => {
  const result = await axios.get(`/search/photos`, {
    params: {
      query: query,
      page: page,
      per_page: 10,
      client_id: API_KEY,
    },
  });

  return result.data.hits;
};
