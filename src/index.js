import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/css/material.blue_grey-blue.min.css';
import 'react-mdl/extra/material.js';
import 'react-mdl/out/ReactMDL.min.js';

import {Sermons, Sermon, SermonEdit } from './modules/sermon';
import {Congregations, Congregation} from './modules/congregation'
import Feedback from './modules/feedback';

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
          <IndexRedirect to="/congregations/all" />
          <Route path="/congregations" component={Congregations}>
            <Route path="/congregations/:congregationId" component={Congregation}/>
            <Route path="/congregations/:congregationId/:tabId" component={Congregation}/>
          </Route>
          <Route path="/sermons" component={Sermons} />
          <Route path="/sermons/:sermonId" component={Sermon}/>
          <Route path="/sermons/:sermonId/edit" component={SermonEdit}/>
          <Route path="/feedback" component={Feedback}/>
        </Route>
      </Router>
    ),
  document.getElementById('app')
);
