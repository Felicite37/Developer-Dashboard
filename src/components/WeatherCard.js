import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = ({ city = 'London' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Using OpenWeatherMap API (free tier)
        const API_KEY = 'demo'; // Replace with actual API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (err) {
        // Fallback to mock data for demo
        setWeatherData({
          name: city,
          main: { temp: 22, feels_like: 24 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 }
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    );
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Weather in {weatherData.name}
        </h3>
        
        <div className="mb-4">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(weatherData.main.temp)}°C
          </p>
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {weatherData.wind.speed} m/s
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {Math.round(weatherData.main.feels_like)}°C
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <p className="text-lg font-mono text-gray-900 dark:text-white">
            {formatTime(currentTime)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Time</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;