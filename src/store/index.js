import { configureStore } from '@reduxjs/toolkit';

import countrySlice from './country-slice';
import articlesSlice from './articles-slice';
import authSlice from './auth-slice';
import curWeatherSlice from './currentWeather-slice';
import futWeatherSlice from './futureWeather-slice';

const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    articles: articlesSlice.reducer,
    auth: authSlice.reducer,
    curWeather: curWeatherSlice.reducer,
    futWeather: futWeatherSlice.reducer,
  },
});

export default store;
