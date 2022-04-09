import { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import CountryContext from '../store/CountryProvider';
import SetArticles from '../components/SetArticles';
import countries from '../lib/countries.json';

const Top = () => {
  const category = 'general';
  const { country } = useContext(CountryContext);
  const params = useParams();
  const history = useHistory();
  const result = countries.some((data) => data.code === params.country);
  if (!result) history.push('/categories/general/us');

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
