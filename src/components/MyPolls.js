import React, { Component } from 'react';
import Relay from 'react-relay';
import Divider from 'material-ui/Divider';
import VoteListComponent from './VoteListComponent';
import DeletePollMutation from '../mutations/DeletePollMutation';

class MyPoll extends Component {

  componentDidMount() {
    this.refresh()
  }

  refresh() {
    this.props.relay.forceFetch();
  }

  deletePoll(pollId) {
    const self = this;
    self.props.relay.commitUpdate(
      new DeletePollMutation({
        id: pollId,
      })
    , {
      onSuccess: this.refresh.bind(self)
    });
  }

  render() {
    const { root: { userVote } } = this.props;
    return (
      <div>
        <h2> My Polls </h2>
        <Divider />
        {
          userVote.length ?
          <VoteListComponent voteList={userVote} isOwner deletePoll={this.deletePoll.bind(this)}/>
          :
          <p>You have not create any polls yet.</p>
        }
      </div>
    );
  }
}

const MyPollContainer = Relay.createContainer(MyPoll, {

  fragments: {
    root: () => {
      return Relay.QL`
        fragment on VoteRoot {
          userVote {
            id,
            topic
          }
        }
      `
    }
  }
});

export default MyPollContainer;
