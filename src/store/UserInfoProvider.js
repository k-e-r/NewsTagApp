import React, { useState } from 'react';

const UserInfoContext = React.createContext({
  userInfo: '',
  userArticles: [],
  setUserInfo: (id) => {},
  setUserArticles: (articles) => {},
});

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState('');
  const [userArticles, setUserArticles] = useState([]);

  const changeUserInfoHandler = (userInfo) => {
    setUserInfo(userInfo);
  };

  const setUserArticlesHandler = (articles) => {
    setUserArticles(articles);
  };

  const settingContext = {
    userInfo: userInfo,
    userArticles: userArticles,
    setUserInfo: changeUserInfoHandler,
    setUserArticles: setUserArticlesHandler,
  };

  return (
    <UserInfoContext.Provider value={settingContext}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
