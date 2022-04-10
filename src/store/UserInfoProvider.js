import React, { useState } from 'react';

const UserInfoContext = React.createContext({
  userInfo: '',
  setUserInfo: (id) => {},
});

export const UserInfoProvider = (props) => {
  const [userInfo, setUserInfo] = useState('');

  const changeUserInfoHandler = (userInfo) => {
    console.log('user set', userInfo);
    setUserInfo(userInfo);
  };

  const settingContext = {
    userInfo: userInfo,
    setUserInfo: changeUserInfoHandler,
  };

  return (
    <UserInfoContext.Provider value={settingContext}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
