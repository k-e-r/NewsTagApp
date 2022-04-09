import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import countries from '../lib/countries.json';

const Health = () => {
  const category = 'health';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const result = countries.some((data) => data.code === params.country);
  if (!result) {
    return <Redirect to='/categories/health/us' />;
  }

  return (
    <section>
      <SetArticles category={category} country={country} />
    </section>
  );
};

export default Health;
