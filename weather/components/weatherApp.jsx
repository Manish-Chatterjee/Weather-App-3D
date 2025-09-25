"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import bgImg from "../public/bgImg.jpg";
import Spline from "@splinetool/react-spline";
import { FaInfoCircle, FaKey } from "react-icons/fa";

const WeatherApp = () => {
  const [place, setPlace] = useState("");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState("");
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("apiKey") || "";
  });
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Save to localStorage whenever apiKey changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem("apiKey", apiKey);
    }
  }, [apiKey]);

  const lat = location[0]?.lat;
  const lon = location[0]?.lon;

  const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
  const baseGeo = "https://api.openweathermap.org/geo/1.0/direct";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseGeo}?q=${query}&appid=${apiKey}`
        );
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [query, apiKey]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchWeatherData();
  }, [lat, lon, apiKey]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setQuery(place);
    }
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

  const timezoneHours = Math.floor(weather?.timezone / 3600);
  const timezoneMinutes = Math.floor((weather?.timezone % 3600) / 60);
  const timezoneFormatted = `${timezoneHours}h : ${timezoneMinutes
    .toString()
    .padStart(2, "0")}m`;
  const timezoneCondition =
    timezoneFormatted !== "NaNh : NaNm" ? timezoneFormatted : "--h : --m";

  const sunriseTime = new Date(weather?.sys?.sunrise * 1000); // convert Unix time to JavaScript Date object
  const sunriseformattedTime = sunriseTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const sunriseTimeDisplay =
    sunriseformattedTime === "Invalid Date" ? "--:--" : sunriseformattedTime;

  const sunsetTime = new Date(weather?.sys?.sunset * 1000); // convert Unix time to JavaScript Date object
  const sunsetformattedTime = sunsetTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
  });
  const sunsetTimeDisplay =
    sunsetformattedTime === "Invalid Date" ? "--:--" : sunsetformattedTime;

  const firstWeatherData = weather?.weather?.[0].main;
  const firstWeatherDescription = weather?.weather?.[0].description;

  const getWeatherScene = () => {
    if (firstWeatherData === "Rain" || firstWeatherData === "Thunderstorm") {
      return (
        <Spline scene="https://prod.spline.design/aFEUjLWaT3f-AR5G/scene.splinecode" />
      );
    } else if (firstWeatherData === "Clouds" || firstWeatherData === "Haze") {
      return (
        <Spline scene="https://prod.spline.design/CHCTlddJ5h1K3hfr/scene.splinecode" />
      );
    } else if (firstWeatherData === "Clear") {
      return (
        <Spline scene="https://prod.spline.design/lcd1KzMAgj02Gz-s/scene.splinecode" />
      );
    } else {
      return null;
    }
  };

  return (
    <div>
      <div className="main">
        <Image
          src={bgImg}
          alt="bg"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className="message">
          <p>change to portrait</p>
        </div>
        <div className="container">
          <input
            type="text"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="place name"
            className="placeName"
          />
          <div className="locationInfo">
            <div id="dataLeft">
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">humidity</p>
                <p className="iconsNo">
                  {weather?.main?.humidity !== undefined
                    ? weather?.main?.humidity + " %"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">pressure</p>
                <p className="iconsNo">
                  {weather?.main?.pressure !== undefined
                    ? weather?.main?.pressure + " hPa"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">visibility</p>
                <p className="iconsNo">
                  {weather?.visibility !== undefined
                    ? (weather?.visibility / 1000).toFixed(1) + " km"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">clouds</p>
                <p className="iconsNo">
                  {weather?.clouds?.all !== undefined
                    ? weather?.clouds?.all + " %"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">sunrise</p>
                <p className="iconsNo">{sunriseTimeDisplay}</p>
              </span>
            </div>
            <div id="dataCenter">
              <div id="cloudyStats">{firstWeatherDescription}</div>
              <div className="spline">{getWeatherScene()}</div>
              {weather?.main?.temp && (
                <p id="temp">{Math.ceil(weather?.main?.temp)} ºC</p>
              )}
            </div>
            <div id="dataRight">
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">wind Deg</p>
                <p className="iconsNo">
                  {weather?.wind?.deg !== undefined
                    ? weather?.wind?.deg + " °"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">wind Speed</p>
                <p className="iconsNo">
                  {weather?.wind?.speed !== undefined
                    ? weather?.wind?.speed + " m/s"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">wind Gust</p>
                <p className="iconsNo">
                  {weather?.wind?.gust !== undefined
                    ? weather?.wind?.gust + " m/s"
                    : "--"}
                </p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">timezone</p>
                <p className="iconsNo">{timezoneCondition}</p>
              </span>
              <span className="dataDisplay">
                <p className="icons"></p>
                <p className="iconsText">sunset</p>
                <p className="iconsNo">{sunsetTimeDisplay}</p>
              </span>
            </div>
          </div>
        </div>
        <div className="info">
          sunrise and sunset timings are based on local time
        </div>
      </div>
      <div className="key">
        <form onSubmit={handleSubmit}>
          <label>
            {/* <button id="key" onClick={handleButtonClick}>
              <FaKey />
            </button> */}
            <button id="key" onClick={handleButtonClick}>
              {isButtonClicked ? (
                <div className="tooltip">
                  <FaInfoCircle />
                  <span className="tooltip-text">
                    You will find the api key in &ldquo;OpenWeatherMap&rdquo;
                    website
                  </span>
                </div>
              ) : (
                <FaKey />
              )}
            </button>
            <input
              type="text"
              value={apiKey}
              placeholder="API KEY"
              onChange={handleApiKeyChange}
              className={isButtonClicked ? "clicked" : "shrinked"}
            />
          </label>
          <br />
          <button type="submit" style={{ display: "none" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default WeatherApp;
