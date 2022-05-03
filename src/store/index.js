import { configureStore } from '@reduxjs/toolkit';

import countrySlice from './country-slice';

const store = configureStore({
  reducer: { country: countrySlice.reducer },
});

export default store;
