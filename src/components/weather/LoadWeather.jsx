import React, { useEffect, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import FutureWeather from './FutureWeather';
import CurrentWeather from './CurrentWeather';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import classes from './LoadWeather.module.css';

import { currentWeather } from '../../lib/api';
import weatherIconJson from '../../lib/weather.json';
import countriesCapital from '../../lib/countries_capital_gnews.json';

let currentTmp;

const LoadWeather = ({ country }) => {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState('');
  const [tmp, setTmp] = useState('');
  const [imgCode, setImgCode] = useState('16dn');
  const [unit, setUnit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  useEffect(() => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      let crd = pos.coords;

      setLat(crd.latitude);
      setLon(crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      const countryCode = countriesCapital.filter(
        (val) => val.code === country
      );
      setLat(countryCode[0].lat);
      setLon(countryCode[0].lon);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  async function loadWeather() {
    if (lat === '' || lon === '') return;
    const currentData = await currentWeather(lat, lon);

    setName(currentData.name);
    setWeather(currentData.weather[0].description);
    currentTmp = Math.round(currentData.main.temp - 273.15);
    setTmp(currentTmp);

    // set icon
    const weatherCode = weatherIconJson
      .filter(
        (weather) => weather.code === currentData.weather[0].id.toString()
      )
      .filter(
        (weather) => weather.icon === currentData.weather[0].icon.toString()
      );
    setImgCode(weatherCode[0].img);
    setLoading(true);
  }
  useAsyncEffect(loadWeather, [lat, lon]);

  const clickHandler = () => {
    if (unit) setTmp(currentTmp + 32);
    else setTmp(currentTmp);
    setUnit(!unit);
  };

  return (
    <section className={classes.weatherBlock}>
      {!loading && <Skeleton height={125} />}
      {loading && (
        <CurrentWeather
          name={name}
          weather={weather}
          imgCode={imgCode}
          tmp={tmp}
          unit={unit}
          clickHandler={clickHandler}
        />
      )}
      <FutureWeather lat={lat} lon={lon} unit={unit} />
    </section>
  );
};

export default LoadWeather;
