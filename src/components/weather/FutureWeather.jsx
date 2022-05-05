import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import { oneCallWeather } from '../../lib/api';
import weatherIconJson from '../../lib/weather.json';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import FutureHourlyWeather from './FutureHourlyWeather';
import FutureDailyWeather from './FutureDailyWeather';

const FutureWeather = ({ lat, lon, unit }) => {
  const [maxTmp, setMaxTmp] = useState('');
  const [minTmp, setMinTmp] = useState('');
  const [hourlyImgCode, setHourlyImgCode] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [dailyImgCode, setDailyImgCode] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadWeather() {
    if (lat === '' || lon === '') return;
    const oneCallData = await oneCallWeather(lat, lon);

    // set icon
    for (let i = 1; i < 5; i++) {
      const weatherCode = weatherIconJson
        .filter(
          (weather) =>
            weather.code === oneCallData.hourly[i * 3].weather[0].id.toString()
        )
        .filter(
          (weather) =>
            weather.icon ===
            oneCallData.hourly[i * 3].weather[0].icon.toString()
        );
      setHourlyImgCode((prev) => [...prev, weatherCode[0].img]);
      setTime((prev) => [
        ...prev,
        new Date(oneCallData.hourly[i * 3].dt * 1000).getHours(),
      ]);
    }

    // set daily report
    for (let i = 1; i < 8; i++) {
      const weatherCode = weatherIconJson
        .filter(
          (weather) =>
            weather.code === oneCallData.daily[i].weather[0].id.toString()
        )
        .filter(
          (weather) =>
            weather.icon === oneCallData.daily[i].weather[0].icon.toString()
        );
      setDailyImgCode((prev) => [...prev, weatherCode[0].img]);
      setDay((prev) => [
        ...prev,
        new Date(oneCallData.daily[i].dt * 1000).getDay(),
      ]);
      setMaxTmp((prev) => [
        ...prev,
        Math.round(oneCallData.daily[i].temp.max - 273.15),
      ]);
      setMinTmp((prev) => [
        ...prev,
        Math.round(oneCallData.daily[i].temp.min - 273.15),
      ]);
    }
    setLoading(true);
  }
  useAsyncEffect(loadWeather, [lat, lon]);

  return (
    <>
      {!loading && <Skeleton height={450} />}
      {loading && (
        <>
          <FutureHourlyWeather
            loading={loading}
            hourlyImgCode={hourlyImgCode}
            time={time}
          />
          <FutureDailyWeather
            loading={loading}
            dailyImgCode={dailyImgCode}
            day={day}
            unit={unit}
            maxTmp={maxTmp}
            minTmp={minTmp}
          />
        </>
      )}
    </>
  );
};

export default FutureWeather;
