import React, { useState, useEffect } from 'react';

const WeatherForecast = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=f2ed928b7b749efc1e46ae99b4c8d0bf`);
        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);

        // Fetch forecast
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=40&appid=f2ed928b7b749efc1e46ae99b4c8d0bf`);
        const forecastData = await forecastResponse.json();
        setForecast(forecastData.list);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        }, error => {
          console.error('Error getting location:', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  if (!currentWeather || forecast.length === 0) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const weatherIcons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '🌫️',
    'Tornado': '🌪️'
  };

  const getCurrentWeatherIcon = () => {
    const main = currentWeather.weather[0].main;
    return weatherIcons[main] || '❓'; // Use question mark for unknown weather
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-2">Current Weather</h1>
      <h2 className="text-xl mb-4">{currentWeather.name}, {currentWeather.sys.country}</h2>
      <p className="text-4xl mb-4">{getCurrentWeatherIcon()}</p>
      <p className="text-xl mb-4">{currentWeather.weather[0].description}</p>

      <h1 className="text-3xl font-bold mb-2">Weather Forecast for the Next 5 Days</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.slice(0, 40).map((forecastItem, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded">
            <p>{forecastItem.dt_txt}</p>
            <p>{weatherIcons[forecastItem.weather[0].main]}</p>
            <p>Temperature: {forecastItem.main.temp}°C</p>
            <p>Weather: {forecastItem.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
