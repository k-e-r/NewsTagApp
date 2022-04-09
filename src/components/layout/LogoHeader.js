import { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './LogoHeader.module.css';

import CountryContext from '../../store/CountryProvider';
import { ReactComponent as Logo } from '../../assets/bookmark.svg';

const LogoHeader = () => {
  const [country, setCountry] = useState('us');

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
          {/* <p>SEARCH</p> */}
          <div className={classes.subMenu}>
            <NavLink
              activeClassName={classes.active}
              to='/mypage'
              className={classes.login}
            >
              MY PAGE
            </NavLink>
            <NavLink
              activeClassName={classes.active}
              to='/login'
              className={classes.login}
            >
              LOGIN
            </NavLink>
            <select value={country} onChange={countryChange}>
              <option value='us'>USA</option>
              <option value='ca'>Canada</option>
              <option value='jp'>Japan</option>
              <option value='ae'>Emirates</option>
              <option value='ar'>Argentina</option>
              <option value='at'>Austria</option>
              <option value='au'>Australia</option>
              <option value='be'>Belgium</option>
              <option value='bg'>Bulgaria</option>
              <option value='br'>Brazil</option>
              <option value='ch'>Switzerland</option>
              <option value='cn'>China</option>
              <option value='co'>Colombia</option>
              <option value='cu'>Cuba</option>
              <option value='cz'>Czechia</option>
              <option value='de'>Germany</option>
              <option value='eg'>Egypt</option>
              <option value='fr'>France</option>
              <option value='gb'>UK</option>
              <option value='gr'>Greece</option>
              <option value='hk'>Hong Kong</option>
              <option value='hu'>Hungary</option>
              <option value='id'>Indonesia</option>
              <option value='ie'>Ireland</option>
              <option value='il'>Israel</option>
              <option value='in'>India</option>
              <option value='it'>Italy</option>
              <option value='kr'>Korea</option>
              <option value='lt'>Lithuania</option>
              <option value='lv'>Latvia</option>
              <option value='ma'>Morocco</option>
              <option value='mx'>Mexico</option>
              <option value='my'>Malaysia</option>
              <option value='ng'>Nigeria</option>
              <option value='nl'>Netherlands</option>
              <option value='no'>Norway</option>
              <option value='nz'>New Zealand</option>
              <option value='ph'>Philippines</option>
              <option value='pl'>Poland</option>
              <option value='pt'>Portugal</option>
              <option value='ro'>Romania</option>
              <option value='rs'>Serbia</option>
              <option value='ru'>Russia</option>
              <option value='sa'>Saudi Arabia</option>
              <option value='se'>Sweden</option>
              <option value='sg'>Singapore</option>
              <option value='si'>Slovenia</option>
              <option value='sk'>Slovakia</option>
              <option value='th'>Thailand</option>
              <option value='tr'>Turkey</option>
              <option value='tw'>Taiwan</option>
              <option value='ua'>Ukraine</option>
              <option value='ve'>Venezuela</option>
              <option value='za'>South Africa</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoHeader;
