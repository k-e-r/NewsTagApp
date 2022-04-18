import 'react-loading-skeleton/dist/skeleton.css';

import Loading from '../function/Loading';
import Card from './Card';
import classes from './Card.module.css';

const ArticlesCards = ({ articles, source = '' }) => {
  return (
    <ul className={classes.articles}>
      {!articles?.length && <Loading />}
      {articles?.length &&
        articles.map((article) => (
          <li className={classes.article} key={article.url}>
            <Card article={article} source={source} />
          </li>
      ))}
    </ul>
  );
};

export default ArticlesCards;
