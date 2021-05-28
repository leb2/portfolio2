import React from 'react';


import './styles.scss';
import './blog/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './landing/index';
import BlogAnki from "./blog/blog_anki";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <div className="main">
      <Router>
        <Switch>
          <Route path="/blog/anki">
            <BlogAnki />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
