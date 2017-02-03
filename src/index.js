import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/css/material.blue_grey-blue.min.css';
import 'react-mdl/extra/material.js';

import Sermons from './modules/Sermons.js';
import CongregationSermons from './modules/CongregationSermons.js';
import Sermon from './modules/Sermon.js';
import Feedback from './modules/Feedback.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './App';
import './index.css';

ReactDOM.render(
  (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/sermons/all" />
          <Route path="/sermons" component={Sermons}>
            <Route path="/sermons/:congregationId" component={CongregationSermons}/>
            <Route path="/sermons/:congregationId/:sermonId" component={Sermon}/>
          </Route>
          <Route path="/feedback" component={Feedback}/>
        </Route>
      </Router>
    ),
  document.getElementById('app')
);
