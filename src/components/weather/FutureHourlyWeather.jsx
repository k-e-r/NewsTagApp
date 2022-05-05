import React from 'react';
import IcomoonReact from 'icomoon-react';

import iconSet from '../../assets/weather-selection.json';
import classes from './FutureWeather.module.css';

const FutureHourlyWeather = ({ loading, hourlyImgCode, time }) => {
  return (
    <>
      <div className={classes.hourlyBlock}>
        {loading &&
          hourlyImgCode.map((img, idx) => (
            <div key={idx} className={classes.hourlyDetail}>
              {time[idx] > 12 ? (
                <p className={classes.time}>{time[idx] - 12} PM</p>
              ) : (
                <p className={classes.time}>{time[idx]} AM</p>
              )}
              <IcomoonReact
                className={classes.hourlyIcon}
                iconSet={iconSet}
                icon={img}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default FutureHourlyWeather;
