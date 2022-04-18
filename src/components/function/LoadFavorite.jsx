import { useEffect, useContext, useState } from 'react';

import ArticlesCards from '../layout/ArticlesCards';
import ArticlesContext from '../../store/ArticlesProvider';
import classes from './LoadFavorite.module.css';

const LoadFavorite = () => {
  const [loadedArticles, setLoadedArticles] = useState([]);
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;

  useEffect(() => {
    // LIFO
    setLoadedArticles(
      articles.map((x, idx, articles) => articles[articles.length - 1 - idx])
      );
  }, [articles]);

  return (
    <section>
      {loadedArticles.length !== 0 && (
        <>
          <ArticlesCards articles={loadedArticles} source='mypage' />
        </>
      )}
      {loadedArticles.length === 0 && (
        <>
          <p className={classes.mypage}>
            Bookmark does not seem to have been done yet.
          </p>
          <p className={classes.mypage}>Please bookmark some pages you like.</p>
        </>
      )}
    </section>
  );
};

export default LoadFavorite;
