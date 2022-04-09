import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import countries from '../lib/countries.json';

const Top = () => {
  const category = 'general';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const result = countries.some((data) => data.code === params.country);
  // history.pushでの遷移時下記Warningが出たため、Redirectに変更
  // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  if (!result) {
    return <Redirect to='/categories/general/us' />;
  }

  console.log('Top', country);

  return (
    <section>
      <SetArticles category={category} country={country} />
    </section>
  );
};

export default Top;
