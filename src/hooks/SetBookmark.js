import { useContext, useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import { getSingleUser, addUserBook, putUserBook } from '../lib/api';
import ArticlesContext from '../store/ArticlesProvider';
import AuthContext from '../store/AuthProvider';

const SetBookmark = (props) => {
  const authCtx = useContext(AuthContext);
  const localId = authCtx.localId;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;
  const [userInfo, setUserInfo] = useState('');

  // initで登録データcheck & set
  async function loadArticles() {
    const data = await getSingleUser(localId);
    if (data[0]) {
      // user登録済みか確認
      if (data[0].articles) {
        // 登録された記事読み込み
        for (let i = 0; i < data[0].articles.length; i++) {
          // 登録された記事をContextに保存
          articlesCtx.addArticles(data[0].articles[i]);
        }
      }
      setUserInfo(data[0].id);
    } else {
      // user登録
      await addUserBook(
        {
          data: localId,
          articles: [],
        },
        localId
      );
    }
  }
  useAsyncEffect(loadArticles, [localId]);

  // 変更があった場合、Serverに反映
  async function putArticles() {
    if (userInfo) {
      putUserBook(articles, localId, userInfo);
    }
  }
  useAsyncEffect(putArticles, [articles]);

  return <>{props.children}</>;
};

export default SetBookmark;
