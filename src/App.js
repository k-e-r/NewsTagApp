import { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import MainHeader from './components/common/Header/MainHeader';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Footer from './components/common/Footer';
import useSetBookmark from './hooks/useSetBookmark';
import { authActions } from './store/auth-slice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.loginCheck());
  }, []);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useSetBookmark();

  return (
    <>
      <MainHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/categories/:category/:country' />
          </Route>
          <Route
            path='/categories/:category/:country?'
            component={CategoryPage}
            exact
          />
          {!isLoggedIn && <Route path='/login' component={Login} exact />}
          {isLoggedIn && <Route path='/mypage' component={Mypage} exact />}
          <Route path='*'>
            <Redirect to='/categories/:category/:country' />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
