import React from 'react';
import IcomoonReact from 'icomoon-react';

import iconSet from '../../assets/weather-selection.json';
import classes from './FutureWeather.module.css';

const dayList = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const FutureDailyWeather = ({ loading, dailyImgCode, day, maxTmp, minTmp }) => {
  return (
    <>
      <div className={classes.dailyBlock}>
        {loading &&
          dailyImgCode.map((img, idx) => (
            <div key={idx} className={classes.dailyDetail}>
              <p className={classes.dayClass}>{dayList[day[idx]]}</p>
              <IcomoonReact
                className={classes.dailyIcon}
                iconSet={iconSet}
                icon={img}
              />
              <p className={classes.maxTemp}>{maxTmp[idx]}</p>
              <p className={classes.minTemp}>{minTmp[idx]}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default FutureDailyWeather;
