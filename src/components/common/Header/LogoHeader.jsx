import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './LogoHeader.module.css';

import { countryActions } from '../../../store/country-slice';
import useAuthentiation from '../../../hooks/useAuthentication';
import countries from '../../../lib/countries_gnews.json';
import { ReactComponent as Logo } from '../../../assets/bookmark.svg';
import iconSet from '../../../assets/selection.json';
import IcomoonReact from 'icomoon-react';
import { ReactComponent as ChevronDown } from '../../../assets/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../assets/chevron-up.svg';

let openFlg = false;

const LogoHeader = (props) => {
  const location = useLocation();
  const authCtx = useAuthentiation();
  const { isLoggedIn, userEmail } = authCtx;
  const dispatch = useDispatch();

  const [country, setCountry] = useState(
    useSelector((state) => state.country.country)
  );
  const sortCountries = countries.sort((a, b) => {
    if (a.country < b.country) return -1;
    else if (a.country > b.country) return 1;
    return 0;
  });

  const [isOpen, setIsOpen] = useState(props.val);

  const countryChange = (code) => {
    setCountry(code);
    dispatch(countryActions.setCountry(code));
  };

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
    return <Redirect to={'/'} />;
  };

  return (
    <>
      <div className={classes.flexBox}>
        <div className={classes.logoBar}>
          <div className={classes.logo}>
            <Link to='/'>
              <p className={classes.logoName}>News</p>
              <Logo className={classes.logoIcon} />
            </Link>
          </div>
          <div className={classes.subMenu}>
            <div className={classes.upperMenu}>
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
              <button onClick={clickHandler} className={classes.countryBtn}>
                <IcomoonReact iconSet={iconSet} size={20} icon={country} />
                {(isOpen === null || isOpen === false) && (
                  <ChevronUp className={classes.icon} />
                )}
                {isOpen === true && <ChevronDown className={classes.icon} />}
              </button>
              {isOpen === true && (
                <>
                  <div className={classes.background} onClick={clickHandler} />
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
                </>
              )}
            </div>
            {isLoggedIn && <p className={classes.lowerMenu}>{userEmail}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
