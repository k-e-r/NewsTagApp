import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncEffect from 'use-async-effect';

import FutureHourlyWeather from './FutureHourlyWeather';
import FutureDailyWeather from './FutureDailyWeather';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { futWeatherActions } from '../../store/futureWeather-slice';
import { oneCallWeather } from '../../lib/api';
import weatherIconJson from '../../lib/weather.json';

const FutureWeather = ({ lat, lon, unit, country }) => {
  const [loading, setLoading] = useState(false);
  const {
    maxTmp,
    minTmp,
    degCMaxTmp,
    degCMinTmp,
    hourlyImgCode,
    time,
    day,
    dailyImgCode,
    prevCountry,
  } = useSelector((state) => state.futWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!unit) {
      dispatch(
        futWeatherActions.setFutWeather({
          maxTmp: degCMaxTmp.map((tmp) => tmp + 32),
          minTmp: degCMinTmp.map((tmp) => tmp + 32),
        })
      );
    } else {
      dispatch(
        futWeatherActions.setFutWeather({
          maxTmp: degCMaxTmp,
          minTmp: degCMinTmp,
        })
      );
    }
  }, [unit]);

  async function loadWeather() {
    if (lat === '' || lon === '') return;
    if (prevCountry === country) {
      setLoading(true);
      return;
    }
    const oneCallData = await oneCallWeather(lat, lon);
    let hourlyImgCodeData = [],
      timeData = [],
      dailyImgCodeData = [],
      dayData = [],
      maxTmpData = [],
      degCMaxTmpData = [],
      minTmpData = [],
      degCMinTmpData = [];

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
      hourlyImgCodeData.push(weatherCode[0].img);
      timeData.push(new Date(oneCallData.hourly[i * 3].dt * 1000).getHours());
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
      dailyImgCodeData.push(weatherCode[0].img);
      dayData.push(new Date(oneCallData.daily[i].dt * 1000).getDay());
      maxTmpData.push(Math.round(oneCallData.daily[i].temp.max - 273.15));
      degCMaxTmpData.push(Math.round(oneCallData.daily[i].temp.max - 273.15));
      minTmpData.push(Math.round(oneCallData.daily[i].temp.min - 273.15));
      degCMinTmpData.push(Math.round(oneCallData.daily[i].temp.min - 273.15));
    }
    dispatch(
      futWeatherActions.setFutWeather({
        maxTmp: maxTmpData,
        minTmp: minTmpData,
        degCMaxTmp: degCMaxTmpData,
        degCMinTmp: degCMinTmpData,
        hourlyImgCode: hourlyImgCodeData,
        time: timeData,
        day: dayData,
        dailyImgCode: dailyImgCodeData,
        prevCountry: country,
      })
    );
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
            maxTmp={maxTmp}
            minTmp={minTmp}
          />
        </>
      )}
    </>
  );
};

export default FutureWeather;
