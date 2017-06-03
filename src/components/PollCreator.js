import React, { Component } from 'react';
import Relay from 'react-relay';
import { browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import get from 'lodash/get';
import CreatePollMutation from '../mutations/CreatePollMutation';

class PollCreator extends Component {

  constructor(props) {
    super(props);
    this.createPoll = this.createPoll.bind(this);
  }

  state = {
    topic: '',
    voteOptions: '',
    errorMessage: '',
  }

  createPoll() {
    const self = this;
    self.setState({
      errorMessage: '',
    });
    const {
      topic,
      voteOptions,
    } = self.state;
    const voteOptionTokens = voteOptions.split('\n');
    self.props.relay.commitUpdate(
      new CreatePollMutation({
        topic,
        voteOptions: voteOptionTokens,
      })
    , {
      onSuccess: () => {
        browserHistory.push('/mypolls');
      },
      onFailure: (transaction) => {
        const errorMessage = get(transaction.getError(), 'source.errors.0.message');
        self.setState({
          errorMessage,
        })
      }
    });
  }

  render() {
    const { topic, voteOptions } = this.state;
    return (
      <div>
        <h2>New Poll</h2>
        <TextField
          hintText="Poll Topic"
          onChange={(e) => { this.setState({topic: e.target.value}) }}
          value={topic}
        />
        <br />
        <TextField
          hintText="vote options one on each line"
          multiLine={true}
          rows={3}
          onChange={(e) => { this.setState({voteOptions: e.target.value}) }}
          value={voteOptions}
        />
        <br />
        <div style={{
          width: 256,
          margin: '20px 0',
          textAlign: 'right',
        }}>
          <RaisedButton
            label="Clear"
            style={{
              marginRight: 10
            }}
            onClick={() => { this.setState({
              topic: '',
              voteOptions: '',
            })
          }} />
          <RaisedButton label="Submit" primary onClick={this.createPoll} />
        </div>
      </div>
    );
  }
}

const PollCreatorContainer = Relay.createContainer(PollCreator, {
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

export default PollCreatorContainer;
