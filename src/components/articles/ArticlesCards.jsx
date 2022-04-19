import 'react-loading-skeleton/dist/skeleton.css';

import Loading from './Loading';
import ArticleCard from './ArticleCard';
import classes from './Articles.module.css';

const ArticlesCards = ({ articles, source = '' }) => {
  return (
    <ul className={classes.articles}>
      {!articles?.length && <Loading />}
      {articles?.length &&
        articles.map((article) => (
          <li className={classes.article} key={article.url}>
            <ArticleCard article={article} source={source} />
          </li>
      ))}
    </ul>
  );
};

export default ArticlesCards;
