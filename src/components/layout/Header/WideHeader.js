import { NavLink } from 'react-router-dom';

import classes from './WideHeader.module.css';
import pages from '../../../lib/pages_gnews.json';

const WideHeader = () => {
  return (
    <>
      <nav className={classes.mainMenu}>
        <ul>
          {pages.wide.map((data) => (
            <li key={data.path}>
              <NavLink activeClassName={classes.active} to={data.path}>
                {data.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default WideHeader;
