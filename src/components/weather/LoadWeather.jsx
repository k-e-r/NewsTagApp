import React, { useEffect, useState } from 'react';

import FutureWeather from './FutureWeather';
import CurrentWeather from './CurrentWeather';

import classes from './LoadWeather.module.css';
import countriesCapital from '../../lib/countries_capital_gnews.json';

const LoadWeather = ({ country }) => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [unit, setUnit] = useState(true);

  useEffect(() => {
    const countryCode = countriesCapital.filter((val) => val.code === country);
    setLat(countryCode[0].lat);
    setLon(countryCode[0].lon);
  }, []);

  const clickHandler = () => {
    setUnit((prev) => !prev);
  };

  return (
    <section className={classes.weatherBlock}>
      <CurrentWeather
        lat={lat}
        lon={lon}
        unit={unit}
        clickHandler={clickHandler}
        country={country}
      />
      <FutureWeather lat={lat} lon={lon} unit={unit} country={country} />
    </section>
  );
};

export default LoadWeather;
