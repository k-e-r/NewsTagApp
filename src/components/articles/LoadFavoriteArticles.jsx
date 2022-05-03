import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ArticlesCards from './ArticlesCards';
import classes from './LoadFavoriteArticles.module.css';

const LoadFavoriteArticles = () => {
  const [loadedArticles, setLoadedArticles] = useState([]);
  const articles = useSelector((state) => state.articles.articles);

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

export default LoadFavoriteArticles;
