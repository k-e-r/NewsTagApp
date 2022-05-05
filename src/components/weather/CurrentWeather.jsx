import React from 'react';
import IcomoonReact from 'icomoon-react';

import iconSet from '../../assets/weather-selection.json';
import classes from './CurrentWeather.module.css';

const CurrentWeather = ({
  name,
  weather,
  imgCode,
  tmp,
  unit,
  clickHandler,
}) => {
  return (
    <>
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
    </>
  );
};

export default CurrentWeather;
