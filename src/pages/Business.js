import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import countries from '../lib/countries.json';

const Business = () => {
  const category = 'business';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const result = countries.some((data) => data.code === params.country);

  if (!result) {
    return <Redirect to={`/categories/${category}/us`} />;
  } else if (country !== params.country) {
    return <Redirect to={`/categories/${category}/${country}`} />;
  }

  return (
    <section>
      <SetArticles category={category} country={country} />
    </section>
  );
};

export default Business;
