import { useState, useContext } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import classes from './LogoHeader.module.css';

import CountryContext from '../../store/CountryProvider';
import AuthContext from '../../store/AuthProvider';
import countries from '../../lib/countries.json';
import { ReactComponent as Logo } from '../../assets/bookmark.svg';

const LogoHeader = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
    return <Redirect to='/' />;
  };

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
            {!isLoggedIn && (
              <NavLink
                activeClassName={classes.active}
                to='/login'
                className={classes.login}
              >
                LOGIN
              </NavLink>
            )}
            {isLoggedIn && (
              <>
                <NavLink
                  activeClassName={classes.active}
                  to='/mypage'
                  className={classes.login}
                >
                  MY PAGE
                </NavLink>
                <button className={classes.btn} onClick={logoutHandler}>
                  LOGOUT
                </button>
              </>
            )}
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
