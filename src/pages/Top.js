import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import countries from '../lib/countries.json';
import SetBookmark from '../components/layout/SetBookmark';

const Top = () => {
  const category = 'general';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const result = countries.some((data) => data.code === country);

  // history.pushでの遷移時下記Warningが出たため、Redirectに変更
  // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  if (!result) {
    return <Redirect to={`/categories/${category}/us`} />;
  } else if (country !== params.country) {
    return <Redirect to={`/categories/${category}/${country}`} />;
  }

  console.log('Top', country);

  return (
    <section>
      <SetArticles category={category} country={country} />
      <SetBookmark />
    </section>
  );
};

export default Top;
