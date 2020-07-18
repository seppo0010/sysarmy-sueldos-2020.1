import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Form from './Form';
import Text from './Text';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/text/:article/index.html">
            <Text />
          </Route>
          <Route exact path="/text/:article/:subarticle.html">
            <Text />
          </Route>
          <Route path="/">
            <Form />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
