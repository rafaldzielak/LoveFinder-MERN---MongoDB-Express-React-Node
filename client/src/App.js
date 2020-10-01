import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
// import PeopleActions from "./components/people/PeopleActions";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='containerUser'>
          <Fragment>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Fragment>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
