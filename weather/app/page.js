'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import bgImg from '../public/bgImg.jpg'
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
  console.log(timezoneFormatted,'nan');
  const timezoneCondition = timezoneFormatted !== 'NaNh : NaNm' ? timezoneFormatted : '--h : --m'

  const sunriseTime = new Date(weather?.sys?.sunrise * 1000); // convert Unix time to JavaScript Date object
  const sunriseformattedTime = sunriseTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' });
  const sunriseTimeDisplay = sunriseformattedTime === 'Invalid Date' ? '--:--' : sunriseformattedTime
  console.log(sunriseTimeDisplay,'sunrise')

  const sunsetTime = new Date(weather?.sys?.sunset * 1000); // convert Unix time to JavaScript Date object
  const sunsetformattedTime = sunsetTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' });
  const sunsetTimeDisplay = sunsetformattedTime === 'Invalid Date' ? '--:--' : sunsetformattedTime

  const firstWeatherData = weather?.weather?.[0].main;
  const firstWeatherDescription = weather?.weather?.[0].description;
  console.log(firstWeatherData,'data24')

  const getWeatherScene = () => {
    if (firstWeatherData === "Rain" || firstWeatherData === "Thunderstorm") {
      return <Spline scene="https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode" />;
    } else if (firstWeatherData === "Clouds" || firstWeatherData === "Haze") {
      return <Spline scene="https://prod.spline.design/CHCTlddJ5h1K3hfr/scene.splinecode" />;
    } else if (firstWeatherData === "Clear") {
      return <Spline scene="https://prod.spline.design/lcd1KzMAgj02Gz-s/scene.splinecode" />;
    } else {
      return null;
    }
  };

  console.log(process.env.NEXT_PUBLIC_REACT_APP_API_KEY,'key')

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


  return (
    <div>
      <div className='main'>
        <Image src={bgImg} alt='bg' layout='fill' objectFit='cover' objectPosition='center' />
        <div className="message"><p>these app better runs on desktop</p></div>
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
                <p className='iconsNo'>{weather?.main?.humidity !== undefined ? weather?.main?.humidity +' %' : '--'}</p>
              </span>
              <span className='dataDisplay'>
              <p className='icons'></p>
                <p className='iconsText'>pressure</p>
                <p className='iconsNo'>{weather?.main?.pressure !== undefined ? weather?.main?.pressure +' hPa' : '--'}</p>
              </span>
              <span className='dataDisplay'>
              <p className='icons'></p>
                <p className='iconsText'>visibility</p>
                <p className='iconsNo'>{weather?.visibility !== undefined ? (weather?.visibility / 1000).toFixed(1) +' km' : '--'}</p>
              </span>
              <span className='dataDisplay'>
              <p className='icons'></p>
                <p className='iconsText'>clouds</p>
                <p className='iconsNo'>{weather?.clouds?.all !== undefined ? weather?.clouds?.all +' %' : '--'}</p>
              </span>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>sunrise</p>
                {/* <p className='iconsNo'>{weather?.sys?.sunrise}</p> */}
                {/* <p className='iconsNo'>{`${Math.floor(weather?.sys?.sunrise / 3600) % 24}:${Math.floor((weather?.sys?.sunrise / 60) % 60).toString().padStart(2, '0')}:${(weather?.sys?.sunrise % 60).toString().padStart(2, '0')}`}</p> */}
                <p className='iconsNo'>{sunriseTimeDisplay}</p>
              </span>
            </div>
            <div id='dataCenter'>
              <div id='cloudyStats'>

                {firstWeatherDescription}
              </div>
              <div className='spline'>

                {getWeatherScene()}

              </div>
              {weather?.main?.temp &&
              <p id='temp'>{Math.ceil(weather?.main?.temp)} ºC</p>}
            </div>
            <div id='dataRight'>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>wind Deg</p>
                <p className='iconsNo'>{weather?.wind?.deg !== undefined ? weather?.wind?.deg +' °' : '--'}</p>
              </span>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>wind Speed</p>
                <p className='iconsNo'>{weather?.wind?.speed !== undefined ? weather?.wind?.speed +' m/s' : '--'}</p>
              </span>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>wind Gust</p>
                <p className='iconsNo'>{weather?.wind?.gust !== undefined ? weather?.wind?.gust +' m/s' : '--'}</p>
              </span>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>timezone</p>
                <p className='iconsNo'>{timezoneCondition}</p>
              </span>
              <span className='dataDisplay'>
                <p className='icons'></p>
                <p className='iconsText'>sunset</p>
                <p className='iconsNo'>{sunsetTimeDisplay}</p>
              </span>
            </div>
          </div>
        </div>
        <div className='info'>sunrise and sunset timings are based on local time</div>
      </div>
    </div>
  )
}

export default page
