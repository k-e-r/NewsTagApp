import classes from './MainHeader.module.css';

import useWindowDimensions from '../../../hooks/useWindowDimensions';
import LogoHeader from './LogoHeader';
import WideHeader from './WideHeader';
import NarrowHeader from './NarrowHeader';

const MainHeader = () => {
  const { width } = useWindowDimensions();

  return (
    <header className={classes.header}>
      <LogoHeader val={null} />
      {width > 710 && <WideHeader />}
      {width <= 710 && <NarrowHeader val={null} />}
    </header>
  );
};

export default MainHeader;
