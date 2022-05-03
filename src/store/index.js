import { configureStore } from '@reduxjs/toolkit';

import countrySlice from './country-slice';
import articlesSlice from './articles-slice';

const store = configureStore({
  reducer: {
    country: countrySlice.reducer,
    articles: articlesSlice.reducer,
  },
});

export default store;
