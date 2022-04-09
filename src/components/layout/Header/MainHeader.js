import LogoHeader from '../LogoHeader';
import classes from './MainHeader.module.css';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import WideHeader from './WideHeader';
import NarrowHeader from './NarrowHeader';

const MainHeader = () => {
  const { width } = useWindowDimensions();
  console.log('Main~~~');

  return (
    <header className={classes.header}>
      <LogoHeader />
      {width > 710 && <WideHeader />}
      {width <= 710 && <NarrowHeader val={null} />}
    </header>
  );
};

export default MainHeader;
