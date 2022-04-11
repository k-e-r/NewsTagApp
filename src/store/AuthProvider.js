import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  localId: '',
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
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  // 残り時間が1分未満ならlocalStorageからデータ消して、
  // null返却
  if (remainingTime <= 60000) {
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    localId: storedLocalId,
    duration: remainingTime,
  };
};

export const AuthProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialLocalId;
  if (tokenData) {
    initialToken = tokenData.token;
    initialLocalId = tokenData.localId;
  }
  const [token, setToken] = useState(initialToken);
  const [localId, setLocalId] = useState(initialLocalId);

  // 文字列をtrue/false変換するために２重(!)使用
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setLocalId(null);
    localStorage.removeItem('token');
    localStorage.removeItem('localId');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime, localId) => {
    setToken(token);
    setLocalId(localId);
    localStorage.setItem('token', token);
    localStorage.setItem('localId', localId);
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
