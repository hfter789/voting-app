import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './components/app/App';
import Home from './components/home/Home';
import NoMatch from './components/no-match/NoMatch';
import VoteInfo from './components/vote-info/VoteInfo';
import './index.css';
injectTapEventPlugin();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/vote/:voteId' component={VoteInfo} />
      <Route path='*' component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
