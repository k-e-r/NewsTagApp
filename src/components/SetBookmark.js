import { useContext, useEffect, useState } from 'react';

import ArticlesContext from '../store/ArticlesProvider';
import AuthContext from '../store/AuthProvider';
import UserInfoContext from '../store/UserInfoProvider';
import { getSingleUser, addUserBook, putUserBook } from '../lib/api';

let deepEqual = require('deep-equal');

const SetBookmark = () => {
  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  const userInfoCtx = useContext(UserInfoContext);
  const { userInfo, userArticles } = userInfoCtx;
  const [error, setError] = useState('');

  useEffect(() => {
    if (userInfo !== '' && localId !== '' && userArticles !== null) {
      if (!deepEqual(userArticles, articles)) {
        putUserBook(articles, localId, userInfo)
          .then(console.log('put'))
          .catch((error) => setError('Database Error: ' + error));
      }
    } else if (userInfo === '' && localId !== '') {
      getSingleUser(localId)
        .then((data) => {
          if (data.length !== 0) {
            if (data[0].articles !== undefined) {
              for (let i = 0; i < data[0].articles.length; i++) {
                articlesCtx.addArticles(data[0].articles[i]);
              }
              userInfoCtx.setUserArticles(data[0].articles);
            }
            userInfoCtx.setUserInfo(data[0].id);
          }
        })
        .catch((error) => setError('DB Error: ' + error));
    }
  }, [articles]);

  return <>{error && console.log(`error:${error}`)}</>;
};

export default SetBookmark;
