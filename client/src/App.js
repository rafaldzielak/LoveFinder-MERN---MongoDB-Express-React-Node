import React, { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
// import PeopleActions from "./components/people/PeopleActions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className='containerUser'>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </Fragment>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
