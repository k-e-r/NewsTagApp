import { useContext, useEffect, useState } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import AuthContext from '../../store/AuthProvider';
import UserInfoContext from '../../store/UserInfoProvider';
import { getSingleUser, putUserBook } from '../../lib/api';

let deepEqual = require('deep-equal');

const SetBookmark = () => {
  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  const userInfoCtx = useContext(UserInfoContext);
  const { userInfo, userArticles } = userInfoCtx;
  const [error, setError] = useState('');
  const [loadData, setLoadData] = useState(false);

  // useEffect(() => {
  //   userInfoCtx.setUserInfo('');
  // }, [userInfo]);

  useEffect(() => {
    if (loadData) {
      setLoadData(false);
      getSingleUser(localId)
        .then((data) => {
          if (data.length !== 0) {
            if (data[0].articles !== undefined) {
              userInfoCtx.setUserArticles(data[0].articles);
            }
          }
        })
        .catch((error) => setError('DB Error: ' + error));
    }
  }, [loadData]);

  useEffect(() => {
    // userInfo: localId from LoadFavorite
    // localId: localId from Auth
    if (userInfo !== '' && localId !== '' && userArticles !== null) {
      // Login後、Serverデータload成功している場合
      // かつlocalで更新があった場合
      if (!deepEqual(userArticles, articles)) {
        putUserBook(articles, localId, userInfo)
          .then()
          .catch((error) => setError('Database Error: ' + error));

        setTimeout(() => {
          setLoadData(true);
        }, 500);
      }
    } else if (userInfo === '' && localId !== '') {
      // Login後、Serverデータloadしていない場合
      getSingleUser(localId)
        .then((data) => {
          if (data.length !== 0) {
            if (data[0].articles !== undefined) {
              for (let i = 0; i < data[0].articles.length; i++) {
                // loadデータ登録
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
