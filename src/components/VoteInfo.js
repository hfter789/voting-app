import React, { Component } from 'react';
import Relay from 'react-relay';
import VoteForOptionMutation from '../mutations/VoteForOptionMutation';
import VoteSection from './VoteSection';
import VoteChart from './VoteChart';

class VoteInfo extends Component {

  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(id, optionIndex) {
    this.props.relay.commitUpdate(
      new VoteForOptionMutation({
        voteInfo: this.props.voteInfo,
        optionIndex,
      }),
      {
        onSuccess: () => {
          debugger;
          console.log(this.props);
        }
      }
    );
  }

  render() {
    const { voteInfo } = this.props;
    return (
      <div>
        <VoteSection handleVote={this.handleVote} voteInfo={voteInfo} />
        <VoteChart voteOptions={voteInfo.voteOptions} />
      </div>
    );
  }
}

const VoteInfoContainer = Relay.createContainer(VoteInfo, {
  fragments: {
    voteInfo: () => Relay.QL`
      fragment on VoteInfo {
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
