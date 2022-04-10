import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import SetBookmark from '../components/SetBookmark';
import countries from '../lib/countries.json';

const Sports = () => {
  const category = 'sports';
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

export default Sports;
