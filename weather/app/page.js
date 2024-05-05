'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bgImg from '../public/bgImg.jpg'

import { WiHumidity } from "react-icons/wi";
import Spline from '@splinetool/react-spline';



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

  const timezoneHours = Math.floor(weather?.timezone / 3600);
  const timezoneMinutes = Math.floor((weather?.timezone % 3600) / 60);
  const timezoneFormatted = `${timezoneHours}h : ${timezoneMinutes.toString().padStart(2, '0')}m`;

  const sunriseTime = new Date(weather?.sys?.sunrise * 1000); // convert Unix time to JavaScript Date object
  const formattedTime = sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' });


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

const scenes = {
  scene1: 'https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode',
  scene2: 'https://prod.spline.design/CHCTlddJ5h1K3hfr/scene.splinecode',
}

// const data = {
//   main: 'rain',
// };

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
              <p className='icons'></p>
              <p className='iconsText'>humidity</p>
              <p className='iconsNo'>{weather?.main?.humidity}</p>
            </span>
            <span className='dataDisplay'>
            <p className='icons'></p>
              <p className='iconsText'>pressure</p>
              <p className='iconsNo'>{weather?.main?.pressure}</p>
            </span>
            <span className='dataDisplay'>
            <p className='icons'></p>
              <p className='iconsText'>visibility</p>
              <p className='iconsNo'>{weather?.visibility}</p>
            </span>
            <span className='dataDisplay'>
            <p className='icons'></p>
              <p className='iconsText'>clouds</p>
              <p className='iconsNo'>{weather?.clouds?.all}</p>
            </span>
            <span className='dataDisplay'>
            <p className='icons'></p>
              <p className='iconsText'>timezone</p>
              <p className='iconsNo'>{timezoneFormatted}</p>
            </span>
          </div>
          <div id='dataCenter'>
            <div id='cloudyStats'>

              {weather?.weather?.map((data) => {
                  return(
                    <div>
                    {/* <p>main:{data.main}</p> */}
                    <p>{data.description}</p>
                    </div>
                  )
              })}
            </div>
            <div className='spline'>
            {/* <Spline scene="https://prod.spline.design/CHCTlddJ5h1K3hfr/scene.splinecode" /> */}
            {/* <Spline scene="https://prod.spline.design/CHCTlddJ5h1K3hfr/scene.splinecode" /> */}
            {/* Rainy */}
              {/* // (<Spline scene="https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode" />) */}
            {console.log(weather?.weather?.main,'data18')}
            {/* <Spline scene="https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode" /> */}
            {/* <Spline scene="https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode" /> */}
            </div>
            {weather?.main?.temp &&
            <p id='temp'>{Math.ceil(weather?.main?.temp)} ºC</p>}
          </div>
          <div id='dataRight'>
            <span className='dataDisplay'>
              <p className='icons'></p>
              <p className='iconsText'>wind Deg</p>
              <p className='iconsNo'>{weather?.wind?.deg}</p>
            </span>
            <span className='dataDisplay'>
              <p className='icons'></p>
              <p className='iconsText'>wind Speed</p>
              <p className='iconsNo'>{weather?.wind?.speed}</p>
            </span>
            <span className='dataDisplay'>
              <p className='icons'></p>
              <p className='iconsText'>wind Gust</p>
              <p className='iconsNo'>{weather?.wind?.gust}</p>
            </span>
            {/* {weather?.weather?.map((data) => {
              return(
                <div>
                <p>main:{data.main}</p>
                <p>description:{data.description}</p>
                </div>
              )
            })} */}

            <span className='dataDisplay'>
              <p className='icons'></p>
              <p className='iconsText'>sunrise</p>
              <p className='iconsNo'>{weather?.sys?.sunrise}</p>
              <p className='iconsNo'>{`${Math.floor(weather?.sys?.sunrise / 3600) % 24}:${Math.floor((weather?.sys?.sunrise / 60) % 60).toString().padStart(2, '0')}:${(weather?.sys?.sunrise % 60).toString().padStart(2, '0')}`}</p>
              <p className='iconsNo'>{formattedTime}</p>
            </span>
            <span className='dataDisplay'>
              <p className='icons'></p>
              <p className='iconsText'>sunset</p>
              <p className='iconsNo'>{weather?.sys?.sunset}</p>
              <p className='iconsNo'>{`${Math.floor(weather?.sys?.sunset / 3600) % 24}:${Math.floor((weather?.sys?.sunset / 60) % 60).toString().padStart(2, '0')}:${(weather?.sys?.sunset % 60).toString().padStart(2, '0')}`}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
