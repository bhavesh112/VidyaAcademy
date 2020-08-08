import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Content from "./components/Content";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import Alert from "./components/Alert";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import "./App.css";

import Footer from './components/Footer' 
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[]);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Home}></Route>
          <Alert></Alert>
          <Switch>
            <Route exact path="/content" component={Content}></Route>
            <Route exact path="/contact" component={Contact}></Route>
            <Route exact path="/admin" component={Admin}></Route>
          </Switch>
          <Footer></Footer>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
