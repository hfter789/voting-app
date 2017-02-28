import React, { Component } from 'react';
import Relay from 'react-relay';
import VoteListComponent from './VoteListComponent';

class MyPoll extends Component {
  componentDidMount() {
    const { relay, userId } = this.props;
    relay.setVariables(
      userId,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { userId } = nextProps;
    if (userId !== this.props.userId) {
      this.props.relay.setVariables(
        userId,
      );
    }
  }

  render() {
    const { root: { userVote } } = this.props;
    return (
      <div>
        <h2> My Polls </h2>
        <hr />
        {
          userVote ?
          <VoteListComponent voteList={userVote} />
          :
          <p>You did not create any polls yet.</p>
        }
      </div>
    );
  }
}

const MyPollContainer = Relay.createContainer(MyPoll, {
  initialVariables: {
    userId: null
  },

  fragments: {
    root: () => {
      return Relay.QL`
        fragment on VoteRoot {
          userVote(userId: "test") {
            id,
            topic
          }
        }
      `
    }
  }
});

export default MyPollContainer;
