import { useContext } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import SetArticles from '../components/function/SetArticles';
import SetBookmark from '../components/function/SetBookmark';
import CountryContext from '../store/CountryProvider';
import countries from '../lib/countries_gnews.json';

const CategoryPage = () => {
  const params = useParams();
  const { country } = useContext(CountryContext);
  const result = countries.some((data) => data.code === params.country);

  // history.pushでの遷移時下記Warningが出たため、Redirectに変更
  // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  if (!result) {
    return <Redirect to={`/categories/${params.category}/us`} />;
  } else if (country !== params.country) {
    return <Redirect to={`/categories/${params.category}/${country}`} />;
  }

  return (
    <section>
      <SetArticles category={params.category} country={params.country} />
      <SetBookmark />
    </section>
  );
};

export default CategoryPage;
