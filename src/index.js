import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRedirect, browserHistory, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import Relay from 'react-relay';
import App from './components/App';
import VoteList from './components/VoteList';
import NoMatch from './components/NoMatch';
import VoteInfo from './components/VoteInfo';
import VoteHistory from './components/VoteHistory';
import './index.css';
injectTapEventPlugin();

const voteListQuery = {
  root: () => Relay.QL`query { root }`
};


ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path='/' component={App}>
      <IndexRedirect to='/votelists' />
      <Route path='/votelists'
        component={VoteList}
        queries={voteListQuery}
        prepareParams={params => ({ ...params, id: null })}
      />
      <Route
        path='/vote/:id'
        component={VoteInfo}
        queries={voteListQuery}
      />
      <Route
        path='/votehistory'
        component={VoteHistory}
        queries={voteListQuery}
      />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>,
  document.getElementById('root')
);
