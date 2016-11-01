import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router'
import useRelay from 'react-router-relay';
import Relay from 'react-relay';
import App from './components/app/App';
import VoteList from './components/vote-list/VoteList';
import NoMatch from './components/no-match/NoMatch';
import VoteInfo from './components/vote-info/VoteInfo';
import './index.css';
injectTapEventPlugin();

const voteListQuery = {
  voteList: () => Relay.QL`query { voteList }`
};

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path='/' component={App}>
      <IndexRoute component={VoteList} queries={voteListQuery}/>
      <Route path='/vote/:voteId' component={VoteInfo} />
      <Route path='*' component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
