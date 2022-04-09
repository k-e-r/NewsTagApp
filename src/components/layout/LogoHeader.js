import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './LogoHeader.module.css';

import CountryContext from '../../store/CountryProvider';
import countries from '../../lib/countries.json';
import { ReactComponent as Logo } from '../../assets/bookmark.svg';

const LogoHeader = () => {
  const [country, setCountry] = useState('us');

  const sortCountries = countries.sort((a, b) => {
    if (a.country < b.country) return -1;
    else if (a.country > b.country) return 1;
    return 0;
  });

  const countryCtx = useContext(CountryContext);

  const countryChange = (e) => {
    setCountry(e.target.value);
    countryCtx.setCountry(e.target.value);
  };

  return (
    <>
      <div className={classes.flexBox}>
        <div className={classes.logoBar}>
          <div className={classes.logo}>
            <p className={classes.logoName}>News</p>
            <Logo className={classes.logoIcon} />
          </div>
          <div className={classes.subMenu}>
            {/* <NavLink
                activeClassName={classes.active}
                to='/mypage'
                className={classes.login}
              >
                MY PAGE
              </NavLink> */}
            <NavLink
              activeClassName={classes.active}
              to='/login'
              className={classes.login}
            >
              LOGIN
            </NavLink>
            <select value={country} onChange={countryChange}>
              {sortCountries.map((data) => (
                <option key={data.code} value={data.code}>
                  {data.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
