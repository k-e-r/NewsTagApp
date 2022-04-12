import { useState, useContext, useEffect } from 'react';
import { NavLink, useHistory, Link, useLocation } from 'react-router-dom';

import classes from './LogoHeader.module.css';

import CountryContext from '../../../store/CountryProvider';
import AuthContext from '../../../store/AuthProvider';
import countries from '../../../lib/countries_gnews.json';
import { ReactComponent as Logo } from '../../../assets/bookmark.svg';
import iconSet from '../../../assets/selection.json';
import IcomoonReact, { iconList } from 'icomoon-react';
import { ReactComponent as ChevronDown } from '../../../assets/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../assets/chevron-up.svg';

let openFlg = false;

const LogoHeader = (props) => {
  const location = useLocation();
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, userEmail } = authCtx;
  console.log('userEmail:', userEmail);

  const [country, setCountry] = useState('us');
  const sortCountries = countries.sort((a, b) => {
    if (a.country < b.country) return -1;
    else if (a.country > b.country) return 1;
    return 0;
  });

  const [isOpen, setIsOpen] = useState(props.val);

  // for menu close
  useEffect(() => {
    if (isOpen) {
      if (openFlg) {
        openFlg = false;
        setIsOpen(false);
      } else openFlg = true;
    } else openFlg = false;
  }, location.path);

  const clickHandler = () => {
    if (isOpen === null) {
      // init
      setIsOpen(true);
    } else if (isOpen === true) {
      // 2回目以降
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const logoutHandler = () => {
    authCtx.logout();
    // return <Redirect to={`/categories/general/${country}`} />;
    history.replace('/categories/breaking-news/');
  };

  const countryCtx = useContext(CountryContext);

  const countryChange = (code) => {
    console.log(code);
    setCountry(code);
    countryCtx.setCountry(code);
  };

  return (
    <>
      <div className={classes.flexBox}>
        <div className={classes.logoBar}>
          <div className={classes.logo}>
            <Link to='/categories/breaking-news'>
              <p className={classes.logoName}>News</p>
              <Logo className={classes.logoIcon} />
            </Link>
          </div>
          <div className={classes.subMenu}>
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
                <p className={classes.email}>{userEmail}</p>
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
            <button onClick={clickHandler} className={classes.countryBtn}>
              <IcomoonReact iconSet={iconSet} size={20} icon={country} />
              {(isOpen === null || isOpen === false) && (
                <ChevronUp className={classes.icon} />
              )}
              {isOpen === true && <ChevronDown className={classes.icon} />}
            </button>
            {isOpen === true && (
              <div className={classes.countries}>
                <ul>
                  {sortCountries.map((data) => (
                    <li
                      key={data.code}
                      className={classes.countryList}
                      onClick={() => countryChange(data.code)}
                    >
                      <IcomoonReact
                        iconSet={iconSet}
                        size={20}
                        icon={data.code}
                      />
                      <p>{data.country}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* <select value={country} onChange={countryChange}>
              {sortCountries.map((data) => (
                <option
                  key={data.code}
                  value={data.code}
                  className={classes.test}
                >
                  {data.country}
                </option>
              ))}
            </select> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
