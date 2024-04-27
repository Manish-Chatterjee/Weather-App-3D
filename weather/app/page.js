'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'


const page = () => {

  const [place,setPlace] = useState('')
  const [query,setQuery] = useState('')
  const [location,setLocation] = useState('')
  const [weather,setWeather] = useState('')

  const lat = location[0]?.lat;
  const lon = location[0]?.lon;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setQuery(place)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}?q=${query}&appid=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}`);
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [query]);
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_WEATHER_API}?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}`);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchWeatherData();
  }, [lat,lon]);

console.log(weather,'weather')

  return (
    <div>
      <input
        type="text"
        value={place}
        onChange={(event) => setPlace(event.target.value)}
        onKeyDown={handleKeyDown}  
        placeholder="Enter place name..."
      />
      <p>temp:{weather?.main?.temp}</p>
      <p>humidity:{weather?.main?.humidity}</p>
      <p>pressure:{weather?.main?.pressure}</p>
      <p>wind Deg:{weather?.wind?.deg}</p>
      <p>wind Speed:{weather?.wind?.speed}</p>
    </div>
  )
}

export default page
