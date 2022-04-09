import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import LogoHeader from './LogoHeader';
import classes from './MainHeader.module.css';
import { ReactComponent as ChevronDown } from '../../assets/chevron-down.svg';
import pages from '../../lib/pages.json';

const MainHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
  };
  console.log(pages.pc);

  return (
    <header className={classes.header}>
      {width > 710 && (
        <>
          <LogoHeader size={true} />
          <nav className={classes.mainMenu}>
            <ul>
              {pages.pc.map((data) => (
                <li key={data.path}>
                  <NavLink activeClassName={classes.active} to={data.path}>
                    {data.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
      {width <= 710 && (
        <>
          <LogoHeader size={false} />
          <button className={classes.menubtn} onClick={clickHandler}>
            Category list
            <ChevronDown className={classes.icon} />
          </button>
          <div className={classes.dropdownMenuBox}>
            {!isOpen && (
              <nav
                className={`${classes.menuOpen} ${classes.ModalClosed}`}
              ></nav>
            )}
            {isOpen && (
              <nav className={`${classes.menuOpen} ${classes.ModalOpen}`}>
                <ul>
                  {pages.mobile.map((data) => (
                    <li key={data.path}>
                      <Link
                        className={classes.LinkClass}
                        to={data.path}
                        onClick={clickHandler}
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default MainHeader;
