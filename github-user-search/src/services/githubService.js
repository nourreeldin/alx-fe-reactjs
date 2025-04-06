import axios from 'axios';

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';

export const advancedSearchUsers = async ({ query, location, minRepos, page = 1 }) => {
  let q = query ? `${query} in:login` : '';
  if (location) q += ` location:${location}`;
  if (minRepos) q += ` repos:>=${minRepos}`;

  const response = await axios.get(`${BASE_URL}/search/users`, {
    params: {
      q,
      page,
      per_page: 10,
    },
    headers: { Authorization: `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}` }
  });

  const detailedUsers = await Promise.all(
    response.data.items.map(async (user) => {
      try {
        const userDetails = await axios.get(`${BASE_URL}/users/${user.login}`);
        return { ...user, ...userDetails.data };
      } catch (err) {
        return user;
      }
    })
  );

  return { items: detailedUsers };
};
