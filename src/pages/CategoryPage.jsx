import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadArticles from '../components/articles/LoadArticles';
import LoadWeather from '../components/weather/LoadWeather';

import classes from './CategoryPage.module.css';

import countries from '../lib/countries_gnews.json';
import categories from '../lib/pages_gnews.json';

const CategoryPage = () => {
  const params = useParams();
  const country = useSelector((state) => state.country.country);
  const countryResult = countries.some((data) => data.code === params.country);
  const categoryResult = categories.wide.some(
    (data) => data.path === `/categories/${params.category}`
  );
  let category = params.category;
  if (!categoryResult) category = 'breaking-news';

  // history.pushでの遷移時下記Warningが出たため、Redirectに変更
  // Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.
  if (!countryResult) {
    return <Redirect to={`/categories/${category}/us`} />;
  } else if (country !== params.country) {
    return <Redirect to={`/categories/${category}/${country}`} />;
  }

  return (
    <section className={classes.layout}>
      <LoadArticles category={category} country={params.country} />
      <LoadWeather country={params.country} />
    </section>
  );
};

export default CategoryPage;
