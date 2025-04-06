import React, { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';

function Search() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const data = await advancedSearchUsers({ query, location, minRepos, page });
      setUsers(data.items);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    const data = await advancedSearchUsers({ query, location, minRepos, page: nextPage });
    setUsers((prev) => [...prev, ...data.items]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">GitHub User Search</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex items-center space-x-4 bg-gray-50"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
              {user.location && <p className="text-sm">📍 {user.location}</p>}
              {user.public_repos !== undefined && (
                <p className="text-sm">📦 {user.public_repos} repositories</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={loadMore}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;