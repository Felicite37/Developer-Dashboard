import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GitHubCard = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchGitHubData();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center text-red-500 dark:text-red-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="text-center">
        <img
          src={userData.avatar_url}
          alt={userData.name}
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {userData.name || userData.login}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">@{userData.login}</p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {userData.public_repos}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Repositories</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {userData.followers}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {userData.following}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubCard;