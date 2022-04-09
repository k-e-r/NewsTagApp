import { useContext } from 'react';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';

const Top = () => {
  const category = 'general';
  const { country } = useContext(CountryContext);

  console.log('Top', country);

  return (
    <>
      {/* <section> */}
      <SetArticles category={category} country={country} />
      {/* <Card articles={articles} country={country} /> */}
      {/* </section> */}
    </>
  );
};

export default Top;
