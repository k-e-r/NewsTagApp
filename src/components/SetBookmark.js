import { useContext, useEffect, useState } from 'react';

import ArticlesContext from '../store/ArticlesProvider';
import AuthContext from '../store/AuthProvider';
import UserInfoContext from '../store/UserInfoProvider';
import { getSingleUser, addUserBook, putUserBook } from '../lib/api';

const SetBookmark = () => {
  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  const userInfoCtx = useContext(UserInfoContext);
  const { userInfo } = userInfoCtx;
  const [error, setError] = useState('');
  console.log('userInfo', userInfo);

  useEffect(() => {
    console.log('SetBookmark Effect');
    if (userInfo !== '' && localId !== '') {
      console.log('articles', articles);
      putUserBook(articles, localId, userInfo)
        .then(console.log('put'))
        .catch((error) => setError('Database Error: ' + error));
    } else if (userInfo === '' && localId !== '') {
      getSingleUser(localId)
        .then((data) => {
          console.log('data', data);
          if (data.length !== 0) {
            console.log('data', data, 'id', data[0].id);
            if (data[0].articles !== undefined) {
              articlesCtx.addArticles(data[0].articles);
            }
            userInfoCtx.setUserInfo(data[0].id);
            console.log('read', data[0].id, 'articles', data[0].articles);
          }
        })
        .catch((error) => setError('DB Error: ' + error));
    }
  }, [articles]);

  return <>{console.log(`error:${error}`)}</>;
};

export default SetBookmark;
