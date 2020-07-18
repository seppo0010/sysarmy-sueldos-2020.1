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
          <Route exact path="/">
            <Form />
          </Route>
          <Route exact path="/text/:article">
            <Text />
          </Route>
          <Route exact path="/text/:article/:subarticle">
            <Text />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
