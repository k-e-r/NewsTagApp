import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classes from './NarrowHeader.module.css';
import pages from '../../../lib/pages.json';
import { ReactComponent as ChevronDown } from '../../../assets/chevron-down.svg';
import { ReactComponent as ChevronUp } from '../../../assets/chevron-up.svg';

let openFlg = false;

const NarrowHeader = (props) => {
  const location = useLocation();
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

  return (
    <>
      <button className={classes.menubtn} onClick={clickHandler}>
        Category list
        {(isOpen === null || isOpen === false) && (
          <ChevronUp className={classes.icon} />
        )}
        {isOpen === true && <ChevronDown className={classes.icon} />}
      </button>
      <div className={classes.dropdownMenuBox}>
        {isOpen === null && (
          <nav className={`${classes.menuOpen} ${classes.ModalInit}`} />
        )}
        {isOpen === false && (
          <nav className={`${classes.menuOpen} ${classes.ModalClosed}`} />
        )}
        {isOpen === true && (
          <nav className={`${classes.menuOpen} ${classes.ModalOpen}`}>
            <ul>
              {pages.narrow.map((data) => (
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
  );
};

export default NarrowHeader;
