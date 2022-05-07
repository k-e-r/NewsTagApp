import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncEffect from 'use-async-effect';
import IcomoonReact from 'icomoon-react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import iconSet from '../../assets/weather-selection.json';
import classes from './CurrentWeather.module.css';

import { curWeatherActions } from '../../store/currentWeather-slice';
import { currentWeather } from '../../lib/api';
import weatherIconJson from '../../lib/weather.json';

const CurrentWeather = ({ lat, lon, unit, clickHandler, country }) => {
  const [loading, setLoading] = useState(false);
  const { name, weather, tmp, degCTmp, imgCode, prevCountry } = useSelector(
    (state) => state.curWeather
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!unit)
      dispatch(
        curWeatherActions.setCurWeather({
          tmp: degCTmp + 32,
        })
      );
    else
      dispatch(
        curWeatherActions.setCurWeather({
          tmp: degCTmp,
        })
      );
  }, [unit]);

  async function loadWeather() {
    if (lat === '' || lon === '') return;
    if (prevCountry === country) {
      setLoading(true);
      return;
    }
    const currentData = await currentWeather(lat, lon);
    const currentTmp = Math.round(currentData.main.temp - 273.15);

    // set icon
    const weatherCode = weatherIconJson
      .filter(
        (weather) => weather.code === currentData.weather[0].id.toString()
      )
      .filter(
        (weather) => weather.icon === currentData.weather[0].icon.toString()
      );
    dispatch(
      curWeatherActions.setCurWeather({
        name: currentData.name,
        weather: currentData.weather[0].description,
        tmp: currentTmp,
        degCTmp: currentTmp,
        imgCode: weatherCode[0].img,
      })
    );
    setLoading(true);
  }
  useAsyncEffect(loadWeather, [lat, lon]);

  return (
    <>
      {!loading && <Skeleton height={125} />}
      {loading && (
        <div className={classes.card}>
          <div className={classes.nameVal}>
            <h4>{name}</h4>
            <h5>{weather}</h5>
          </div>
          <div className={classes.weatherVal}>
            <IcomoonReact
              className={classes.icon}
              iconSet={iconSet}
              icon={imgCode}
            />
            <p className={classes.currentTmp}>{tmp}</p>
            {unit && (
              // C
              <button onClick={clickHandler} className={classes.activeUnit}>
                &deg;&#67;
              </button>
            )}
            {!unit && (
              <button onClick={clickHandler} className={classes.passiveUnit}>
                &deg;&#67;
              </button>
            )}
            <p className={classes.currentTmp}>&nbsp;&nbsp;&frasl;</p>
            {!unit && (
              // F
              <button onClick={clickHandler} className={classes.activeUnit}>
                &deg;&#70;
              </button>
            )}
            {unit && (
              <button onClick={clickHandler} className={classes.passiveUnit}>
                &deg;&#70;
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWeather;
