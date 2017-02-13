import React, { Component } from 'react';
import Relay from 'react-relay';
import get from 'lodash/get';
import VoteForOptionMutation from '../mutations/VoteForOptionMutation';
import VoteSection from './VoteSection';
import VoteChart from './VoteChart';

class VoteInfo extends Component {

  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.state = {};
  }

  handleVote(id, optionIndex) {
    const self = this;
    self.setState({
      errorMessage: '',
    })
    self.props.relay.commitUpdate(
      new VoteForOptionMutation({
        voteInfo: self.props.voteInfo,
        optionIndex,
        userID: self.props.userID,
      })
    , {
      onFailure: (transaction) => {
        const errorMessage = get(transaction.getError(), 'source.errors.0.message');
        self.setState({
          errorMessage,
        })
      }
    });
  }

  render() {
    const { voteInfo } = this.props;
    const { errorMessage } = this.state;
    return (
      <div>
        <VoteSection handleVote={this.handleVote} voteInfo={voteInfo} errorMessage={errorMessage} />
        <VoteChart voteOptions={voteInfo.voteOptions} />
      </div>
    );
  }
}

const VoteInfoContainer = Relay.createContainer(VoteInfo, {
  fragments: {
    voteInfo: () => Relay.QL`
      fragment on voteList {
        id
        topic
        voteOptions {
          desc
          voteCount
        }
        ${VoteForOptionMutation.getFragment('voteInfo')},
      }
    `
  }
});

export default VoteInfoContainer;
