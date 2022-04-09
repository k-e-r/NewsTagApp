import { NavLink } from 'react-router-dom';

import LogoHeader from './LogoHeader';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <LogoHeader />
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to='/categories/general'>
              Top
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={classes.active}
              to='/categories/technology'
            >
              Technology
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} to='/categories/business'>
              Business
            </NavLink>
          </li>
          {/*
          <li>
            <NavLink
              activeClassName={classes.active}
              to='/categories/entertainment'
            >
              Entertainment
            </NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
