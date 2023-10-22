// src/Weather.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiFog, WiThunderstorm } from 'react-icons/wi';
import './tailwind.css';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]); // State for the 4-day forecast
  
    const fetchWeatherData = () => {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f557219e441fe5bc8a7c9f0f31b98e4&units=metric`)
        // .then((response) => {
        //     setWeather(response.data);
        //   })
        .then((response) => {
            const weatherData = response.data;
            weatherData.wind.speed = (weatherData.wind.speed * 3.6).toFixed(4); // Convert to km/h and round to 2 decimal places
            setWeather(weatherData);
          })
        .catch((error) => {
          console.error(error);
        });
  
      // Fetch 4-day forecast
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9f557219e441fe5bc8a7c9f0f31b98e4&units=metric`)
        // .then((response) => {
        //     const next4Days = response.data.list.slice(1, 5);
        //     setForecast(next4Days);
        //   })
        .then((response) => {
            const next4Days = response.data.list.slice(1, 5);
            next4Days.forEach((day) => {
              day.wind.speed = (day.wind.speed * 3.6).toFixed(4); // Convert to km/h and round to 2 decimal places
            });
            setForecast(next4Days);
          })
        .catch((error) => {
          console.error(error);
        });
    };


  return (
    <div
      className="bg-cover bg-center bg-no-repeat min-h-screen relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/262006/pexels-photo-262006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover', // Ensure the image covers the entire container
      }}
    >
      <div className="container mx-auto text-center p-10 relative"> {/* Use relative positioning */}
      <div
          className="bg-blue-100 p-4 rounded shadow-lg relative z-10 text-wht"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)'}} // Set background color with transparency
        >
          {weather && (
            <div>
              <h2 className="text-4xl font-bold">
                {weather.name}, {weather.sys.country}
              </h2>
              <div>
                {weather.weather[0].main === 'Clear' && <WiDaySunny size={64} />}
                {weather.weather[0].main === 'Rain' && <WiRain size={64} />}
                {weather.weather[0].main === 'Clouds' && <WiCloudy size={64} />}
                {weather.weather[0].main === 'Snow' && <WiSnow size={64} />}
                {weather.weather[0].main === 'Mist' && <WiFog size={64} />}
                {weather.weather[0].main === 'Thunderstorm' && <WiThunderstorm size={64} />}
              </div>
              <p className="text-2xl">{weather.weather[0].description}</p>
              <p className="text-6xl font-extrabold">{weather.main.temp} K</p>
              <p className="text-lg">Humidity: {weather.main.humidity}%</p>
              <p className="text-lg">Wind Speed: {weather.wind.speed} km/h</p>
            </div>
          )}
            <div className="mt-6">
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
              onClick={fetchWeatherData}
            >
              Get Weather
            </button>
          </div>

          {/* ... (city input and forecast cards) */}
        </div>
        <div className="flex flex-wrap justify-center mt-10">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="p-4 m-2 bg-blue-100 rounded shadow-lg relative"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '20%' }}
            >
              <h3 className="text-xl font-bold">{day.dt_txt.split(' ')[0]}</h3>
              <div>
                {day.weather[0].main === 'Clear' && <WiDaySunny size={32} />}
                {day.weather[0].main === 'Rain' && <WiRain size={32} />}
                {day.weather[0].main === 'Clouds' && <WiCloudy size={32} />}
                {day.weather[0].main === 'Snow' && <WiSnow size={32} />}
                {day.weather[0].main === 'Mist' && <WiFog size={32} />}
                {day.weather[0].main === 'Thunderstorm' && <WiThunderstorm size={32} />}
              </div>
              <p className="text-lg">{day.weather[0].description}</p>
              <p className="text-lg">Temperature: {day.main.temp} K</p>
              <p className="text-lg">Humidity: {day.main.humidity}%</p>
              <p className="text-lg">Wind Speed: {day.wind.speed} km/h</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
