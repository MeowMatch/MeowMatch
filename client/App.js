import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login.js";
import Pets from "./Pet.js";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/pets" component={Pets} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
