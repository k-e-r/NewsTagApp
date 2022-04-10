import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Top from './pages/Top';
import Business from './pages/Business';
import Technology from './pages/Technology';
import Entertainment from './pages/Entertainment';
import Health from './pages/Health';
import Science from './pages/Science';
import Sports from './pages/Sports';
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
            <Redirect to='/categories/general' />
          </Route>
          <Route path='/categories/general' component={Top} exact />
          <Route path='/categories/general/:country' component={Top} />
          <Route path='/categories/technology' component={Technology} exact />
          <Route
            path='/categories/technology/:country'
            component={Technology}
          />
          <Route path='/categories/business' component={Business} exact />
          <Route path='/categories/business/:country' component={Business} />
          <Route
            path='/categories/entertainment'
            component={Entertainment}
            exact
          />
          <Route
            path='/categories/entertainment/:country'
            component={Entertainment}
          />
          <Route path='/categories/health' component={Health} exact />
          <Route path='/categories/health/:country' component={Health} />
          <Route path='/categories/science' component={Science} exact />
          <Route path='/categories/science/:country' component={Science} />
          <Route path='/categories/sports' component={Sports} exact />
          <Route path='/categories/sports/:country' component={Sports} />
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
