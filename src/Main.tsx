import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// store
import { Provider } from 'react-redux';
import { store } from '../src/store';
// views
import { Home } from './views/Home/Home';
import { UserList } from './views/UserList/UserList';

const Main = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Home userType='admin' username='metabou' {...props} />}
        />
        <Route exact path="/userlist" component={UserList} />
      </Switch>
    </Router>
  </Provider>
);

export default Main;
