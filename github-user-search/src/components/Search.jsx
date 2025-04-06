import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    try {
      const data = await fetchUserData(query, location, minRepos);
      setUsers(data.items);
    } catch (err) {
      setError("Looks like we can't find the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for GitHub user"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Min Repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="user-results">
        {users.length > 0 &&
          users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.avatar_url} alt={user.login} className="user-avatar" />
              <h3>{user.login}</h3>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View Profile
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;