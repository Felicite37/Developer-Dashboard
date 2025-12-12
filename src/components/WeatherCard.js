import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = ({ city = 'London' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Using OpenWeatherMap API (free tier)
        const API_KEY = 'demo'; // Replace with your API key
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        // Fallback to mock data for demo purposes
        setWeatherData({
          name: city,
          main: { temp: 22, feels_like: 24 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
          wind: { speed: 3.5 }
        });
        setError(null);
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

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️',
      'Fog': '🌫️'
    };
    return icons[condition] || '🌤️';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Weather in {weatherData.name}
        </h3>
        
        <div className="text-6xl mb-4">
          {getWeatherIcon(weatherData.weather[0].main)}
        </div>
        
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(weatherData.main.temp)}°C
          </p>
          <p className="text-gray-600 dark:text-gray-400 capitalize">
            {weatherData.weather[0].description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 dark:text-gray-400">Wind Speed</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {weatherData.wind.speed} m/s
            </p>
          </div>
          <div>
            <p className="text-gray-600 dark:text-gray-400">Feels Like</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Math.round(weatherData.main.feels_like)}°C
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-400">Current Time</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;