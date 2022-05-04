import { configureStore } from '@reduxjs/toolkit';

import countrySlice from './country-slice';
import articlesSlice from './articles-slice';
import authSlice from './auth-slice';

const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    articles: articlesSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
