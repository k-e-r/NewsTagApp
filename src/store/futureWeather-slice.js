import { createSlice } from '@reduxjs/toolkit';

const futWeatherSlice = createSlice({
  name: 'futWeather',
  initialState: {
    maxTmp: [],
    minTmp: [],
    degCMaxTmp: [],
    degCMinTmp: [],
    hourlyImgCode: [],
    time: [],
    day: [],
    dailyImgCode: [],
    prevCountry: '',
  },
  reducers: {
    setFutWeather(state, action) {
      const weatherData = action.payload;
      if (weatherData.dailyImgCode === undefined) {
        state.maxTmp = weatherData.maxTmp;
        state.minTmp = weatherData.minTmp;
      } else {
        state.maxTmp = weatherData.maxTmp;
        state.minTmp = weatherData.minTmp;
        state.degCMaxTmp = weatherData.degCMaxTmp;
        state.degCMinTmp = weatherData.degCMinTmp;
        state.hourlyImgCode = weatherData.hourlyImgCode;
        state.time = weatherData.time;
        state.day = weatherData.day;
        state.dailyImgCode = weatherData.dailyImgCode;
        state.prevCountry = weatherData.prevCountry;
      }
    },
  },
});

export const futWeatherActions = futWeatherSlice.actions;

export default futWeatherSlice;
