import React, { useState } from 'react';
import { fetchWeather } from './WeatherService';
import './styles.css';

const App = () => {
    const [city, setCity] = useState('Toronto'); // Default city
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const handleGetWeather = async () => {
        try {
            const data = await fetchWeather(city);
            setWeather(data);
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('City not found or an error occurred.');
            setWeather(null);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Weather App</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
            />
            <button onClick={handleGetWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Condition: {weather.weather[0].description}</p>
                    <img
                        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                        alt="Weather Icon"
                    />
                </div>
            )}
        </div>
    );
};

export default App;
