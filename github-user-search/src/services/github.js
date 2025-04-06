import axios from 'axios';

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL;

export const searchUsers = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: { q: query },
   headers: { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
  });
  return response.data;
};