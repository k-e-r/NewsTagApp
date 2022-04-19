import { Route, Switch, Redirect } from 'react-router-dom';

import useAuthentiation from './hooks/useAuthentication';
import MainHeader from './components/common/Header/MainHeader';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Footer from './components/common/Footer';

function App() {
  const authCtx = useAuthentiation();
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
          {!authCtx.isLoggedIn && (
            <Route path='/login' component={Login} exact />
          )}
          {authCtx.isLoggedIn && (
            <Route path='/mypage' component={Mypage} exact />
          )}
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
