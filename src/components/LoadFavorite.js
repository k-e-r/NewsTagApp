import { useEffect, useContext, useState } from 'react';

import { getSingleUser } from '../lib/api';
import Card from './layout/Card';
import AuthContext from '../store/AuthProvider';
import ArticlesContext from '../store/ArticlesProvider';
import classes from './LoadFavorite.module.css';

const LoadFavorite = () => {
  const [error, setError] = useState('');
  const [loadedArticles, setLoadedArticles] = useState([]);

  const authCtx = useContext(AuthContext);
  const usrId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  console.log('loadedArticles', loadedArticles, 'error', error);

  // initで登録データread & set
  useEffect(() => {
    getSingleUser(usrId)
      .then((data) => {
        if (data.length) {
          articlesCtx.addArticles(data);
          setLoadedArticles(data);
          console.log('read');
        }
      })
      .catch((error) => setError('DB Error: ' + error));
  }, []);

  return (
    <section>
      {error === '' && loadedArticles.length !== 0 && (
        <Card articles={loadedArticles} />
      )}
      {error === '' && loadedArticles.length === 0 && (
        <>
          <p className={classes.mypage}>
            Bookmark does not seem to have been done yet.
          </p>
          <p className={classes.mypage}>Please bookmark some pages you like.</p>
        </>
      )}
      {error !== '' && (
        <p className={classes.mypage}>
          Communication with Server failed. Please wait and try again.
        </p>
      )}
    </section>
  );
};

export default LoadFavorite;
