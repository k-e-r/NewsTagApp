import { useContext, useEffect, useState } from 'react';

import ArticlesContext from '../../store/ArticlesProvider';
import AuthContext from '../../store/AuthProvider';

const SetBookmark = () => {
  const authCtx = useContext(AuthContext);
  const localId = authCtx.isLoggedIn;
  const articlesCtx = useContext(ArticlesContext);
  const { articles } = articlesCtx;

  useEffect(() => {
    console.log('SetBookmark Effect');
  }, [articles]);

  return <>{console.log('SetBookmark')}</>;
};

export default SetBookmark;
