/* sessionStorage */
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
import MyPolls from './components/MyPolls';
import PollCreator from './components/PollCreator';
import './index.css';
injectTapEventPlugin();

const voteListQuery = {
  root: () => Relay.QL`query { root }`
};

const session = sessionStorage.getItem('session') || '';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('/graphql', {
    headers: {
      Authorization: session,
    },
  })
);

ReactDOM.render(
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useRelay)}
    environment={Relay.Store}
  >
    <Route path='/' component={App}>
      <IndexRedirect to='/votelist' />
      <Route path='/votelist'
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
        path='/mypolls'
        component={MyPolls}
        queries={voteListQuery}
      />
      <Route
        path='/newpoll'
        component={PollCreator}
        queries={voteListQuery}
      />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>,
  document.getElementById('root')
);
