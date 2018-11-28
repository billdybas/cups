import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Cups from './pages/Cups'

const App = () => (
  <Switch>
    <Route exact path="/" component={Cups} />
  </Switch>
);

export default App;
