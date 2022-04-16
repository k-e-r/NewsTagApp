import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import CategoryPage from './pages/CategoryPage';
import MainHeader from './components/layout/Header/MainHeader';
import AuthContext from './store/AuthProvider';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Footer from './components/layout/Footer';
// import Mypage from './pages/Mypage';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/categories/breaking-news/:country' />
          </Route>
          <Route path='/categories/:category' component={CategoryPage} exact />
          <Route
            path='/categories/:category/:country'
            component={CategoryPage}
            exact
          />
          {!authCtx.isLoggedIn && <Route path='/login' component={Login} />}
          {authCtx.isLoggedIn && <Route path='/mypage' component={Mypage} />}
          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}

export default App;
