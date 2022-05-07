import { createSlice } from '@reduxjs/toolkit';

const curWeatherSlice = createSlice({
  name: 'curWeather',
  initialState: {
    name: '',
    weather: '',
    tmp: '',
    degCTmp: '',
    imgCode: '16dn',
    prevCountry: '',
  },
  reducers: {
    setCurWeather(state, action) {
      const weatherData = action.payload;
      if (weatherData.name === undefined) {
        state.tmp = weatherData.tmp;
      } else {
        state.name = weatherData.name;
        state.weather = weatherData.weather;
        state.tmp = weatherData.tmp;
        state.degCTmp = weatherData.degCTmp;
        state.imgCode = weatherData.imgCode;
        state.prevCountry = weatherData.prevCountry;
      }
    },
  },
});

export const curWeatherActions = curWeatherSlice.actions;

export default curWeatherSlice;
