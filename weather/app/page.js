'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bgImg from '../public/bgImg.jpg'

import { WiHumidity } from "react-icons/wi";



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
    <div className='main'>
      <Image src={bgImg} alt='bg' layout='fill' objectFit='cover' objectPosition='center' />
      <div className='container'>
        <input
          type="text"
          value={place}
          onChange={(event) => setPlace(event.target.value)}
          onKeyDown={handleKeyDown}  
          placeholder="place name"
          className='placeName'
        />
        <div className='locationInfo'>
          <div id='dataLeft'>
            {/* <p id='temp'>temp:{weather?.main?.temp}</p> */}
            <span className='dataDisplay'>
              <p className='icons'><WiHumidity /></p>
              <p className='iconsText'>humidity</p>
              <p className='iconsNo'>{weather?.main?.humidity}</p>
            </span>
            <span className='dataDisplay'>
              <p className='iconsText'>pressure</p>
              <p className='iconsNo'>{weather?.main?.pressure}</p>
            </span>
            <span className='dataDisplay'>
              <p className='iconsText'>visibility:</p>
              <p className='iconsNo'>{weather?.visibility}</p>
            </span>
            <span className='dataDisplay'>
              <p className='iconsText'>clouds</p>
              <p className='iconsNo'>{weather?.clouds?.all}</p>
            </span>
            <span className='dataDisplay'>
              <p className='iconsText'>timezone</p>
              <p className='iconsNo'>{weather?.timezone}</p>
            </span>
          </div>
          <div id='dataCenter'>
          {weather?.weather?.map((data) => {
              return(
                <div id='cloudyStats'>
                {/* <p>main:{data.main}</p> */}
                <p>{data.description}</p>
                </div>
              )
            })}
            <div className='spline'>3D model</div>
            {weather?.main?.temp &&
            <p id='temp'>{Math.ceil(weather?.main?.temp)} ºC</p>}
          </div>
          <div id='dataRight'>
            <p>wind Deg:{weather?.wind?.deg}</p>
            <p>wind Speed:{weather?.wind?.speed}</p>
            <p>wind Gust:{weather?.wind?.gust}</p>
            {weather?.weather?.map((data) => {
              return(
                <div>
                <p>main:{data.main}</p>
                <p>description:{data.description}</p>
                </div>
              )
            })}

            <p>sunrise:{weather?.sys?.sunrise}</p>
            <p>sunset:{weather?.sys?.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
