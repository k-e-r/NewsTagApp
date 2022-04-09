import React, { useState } from 'react';

const CountryContext = React.createContext({
  country: 'us',
  setCountry: (country) => {},
});

export const CountryProvider = (props) => {
  const [country, setCountry] = useState('us');

  const changeCountryHandler = (country) => {
    setCountry(country);
  };

  const settingContext = {
    country: country,
    setCountry: changeCountryHandler,
  };

  return (
    <CountryContext.Provider value={settingContext}>
      {props.children}
    </CountryContext.Provider>
  );
};

export default CountryContext;
