import React, { useContext, useState, useEffect, useCallback } from 'react';

import UserInfoContext from './UserInfoProvider';
import ArticlesContext from './ArticlesProvider';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  localId: '',
  userEmail: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedLocalId = localStorage.getItem('localId');
  const storedUserEmail = localStorage.getItem('userEmail');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // 残り時間が1分未満ならlocalStorageからデータ消して、
  // null返却
  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    localId: storedLocalId,
    userEmail: storedUserEmail,
    duration: remainingTime,
  };
};

export const AuthProvider = (props) => {
  const userInfoCtx = useContext(UserInfoContext);
  const articlesCtx = useContext(ArticlesContext);
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialLocalId;
  let initialUserEmail;
  if (tokenData) {
    initialToken = tokenData.token;
    initialLocalId = tokenData.localId;
    initialUserEmail = tokenData.userEmail;
  }
  const [token, setToken] = useState(initialToken);
  const [localId, setLocalId] = useState(initialLocalId);
  const [userEmail, setUserEmail] = useState(initialUserEmail);

  // 文字列をtrue/false変換するために２重(!)使用
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setLocalId(null);
    setUserEmail(null);
    userInfoCtx.setUserInfo('');
    userInfoCtx.setUserArticles([]);
    articlesCtx.clearArticles();
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, localId, userEmail) => {
    setToken(token);
    setLocalId(localId);
    setUserEmail(userEmail);
    localStorage.setItem('token', token);
    localStorage.setItem('localId', localId);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    localId: localId,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
