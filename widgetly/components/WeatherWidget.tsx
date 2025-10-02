"use client";
import React, { useEffect, useState } from "react";

type WeatherData = {
  name: string;
  main: { temp: number };
  weather: { icon: string; description: string }[];
  cod: number;
  message?: string;
};

type Props = {
  city: string;
  apiKey: string;
};

const WeatherWidget: React.FC<Props> = ({ city, apiKey }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data: WeatherData = await res.json();
        if (data.cod !== 200) {
          setError(data.message || "Weather not found");
          setWeather(null);
        } else {
          setWeather(data);
        }
      } catch (err) {
        setError("Failed to fetch weather");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city, apiKey]);

  if (loading) return <div className="p-4 bg-white/10 rounded shadow w-80 text-center">Loading...</div>;
  if (error) return <div className="p-4 bg-white/10 rounded shadow w-80 text-center">{error}</div>;
  if (!weather) return null;

  return (
    <section className="bg-white/10 p-4 rounded shadow w-80 flex flex-col items-center">
      <h2 className="font-bold text-xl mb-2">Weather in {weather.name}</h2>
      <div className="flex items-center mb-2">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="h-12 w-12"
        />
        <div className="text-2xl ml-2">{Math.round(weather.main.temp)}°C</div>
      </div>
      <div className="text-lg capitalize">{weather.weather[0].description}</div>
    </section>
  );
};

export default WeatherWidget;
