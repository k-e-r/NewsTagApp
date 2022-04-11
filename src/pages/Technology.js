import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/function/SetArticles';
import SetBookmark from '../components/function/SetBookmark';
import countries from '../lib/countries_gnews.json';

const Technology = () => {
  const category = 'technology';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const result = countries.some((data) => data.code === country);

  if (!result) {
    return <Redirect to={`/categories/${category}/us`} />;
  } else if (country !== params.country) {
    return <Redirect to={`/categories/${category}/${country}`} />;
  }

  return (
    <section>
      <SetArticles category={category} country={country} />
      <SetBookmark />
    </section>
  );
};

export default Technology;
