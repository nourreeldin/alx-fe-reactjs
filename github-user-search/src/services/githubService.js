import axios from 'axios';

const BASE_URL = 'https://api.github.com'; 


export const fetchUserData = async (query, location = '', minRepos = 0) => {

  let searchQuery = `${query}`;


  if (location) {
    searchQuery += ` location:${location}`;
  }


  if (minRepos) {
    searchQuery += ` repos:>=${minRepos}`;
  }


  try {
    const response = await axios.get(`${BASE_URL}/search/users`, {
      params: { q: searchQuery },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};