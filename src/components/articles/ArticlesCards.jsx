import 'react-loading-skeleton/dist/skeleton.css';

import ArticleLoading from './ArticleLoading';
import ArticleCard from './ArticleCard';
import classes from './Articles.module.css';

const ArticlesCards = ({ articles, source = '' }) => {
  return (
    <ul>
      {!articles?.length && <ArticleLoading />}
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
