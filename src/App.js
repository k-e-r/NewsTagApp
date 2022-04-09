import { Route, Switch, Redirect } from 'react-router-dom';

import Top from './pages/Top';
// import Business from './pages/Business';
// import Technology from './pages/Technology';
// import Entertainment from './pages/Entertainment';
import MainHeader from './components/layout/MainHeader';
// import Login from './pages/Login';
// import Mypage from './pages/Mypage';

function App() {
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
          {/* <Route path='/categories/business' component={Business} exact />
          <Route path='/categories/business/:country' component={Business} />
          <Route path='/categories/technology' component={Technology} exact />
          <Route
            path='/categories/technology/:country'
            component={Technology}
          />
          <Route
            path='/categories/entertainment'
            component={Entertainment}
            exact
          />
          <Route
            path='/categories/entertainment/:country'
            component={Entertainment}
          />
          <Route path='/login' component={Login} />
          <Route path='/mypage' component={Mypage} /> */}
        </Switch>
      </main>
    </>
  );
}

export default App;
