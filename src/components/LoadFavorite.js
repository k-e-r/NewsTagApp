import { useEffect, useContext, useState } from 'react';

import { getSingleUser, addUserBook } from '../lib/api';
import Card from './layout/Card';
import SetBookmark from './SetBookmark';
import AuthContext from '../store/AuthProvider';
import ArticlesContext from '../store/ArticlesProvider';
import UserInfoContext from '../store/UserInfoProvider';
import classes from './LoadFavorite.module.css';

const LoadFavorite = () => {
  const [error, setError] = useState('');
  const [loadedArticles, setLoadedArticles] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  const userInfoCtx = useContext(UserInfoContext);
  const { userInfo, userArticles } = userInfoCtx;

  useEffect(() => {
    setLoadedArticles(articles);
  }, [articles]);

  // initで登録データcheck & set
  useEffect(() => {
    if (userInfo === '') {
      getSingleUser(localId)
        .then((data) => {
          if (data.length !== 0) {
            // if (data[0].articles !== undefined) {
            //   for (let i = 0; i < data[0].articles.length; i++) {
            //     articlesCtx.addArticles(data[0].articles[i]);
            //   }
            //   userInfoCtx.setUserArticles(data[0].articles);
            //   setLoadedArticles(data[0].articles);
            // }
            // userInfoCtx.setUserInfo(data[0].id);
          } else if (!loadData) {
            // user登録
            addUserBook(
              {
                data: localId,
                articles: [],
              },
              localId
            )
              .then()
              .catch((error) => setError('Database Error: ' + error));
            setTimeout(() => {
              setLoadData(true);
            }, 1000);
          }
        })
        .catch((error) => setError('DB Error: ' + error));
    } else {
      setLoadedArticles(userArticles);
    }
  }, [loadData, userInfo]);

  return (
    <section>
      {error === '' && loadedArticles.length !== 0 && (
        <>
          <Card articles={loadedArticles} source='mypage' />
          <SetBookmark />
        </>
      )}
      {error === '' && loadedArticles.length === 0 && (
        <>
          <p className={classes.mypage}>
            Bookmark does not seem to have been done yet.
          </p>
          <p className={classes.mypage}>Please bookmark some pages you like.</p>
          <SetBookmark />
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
