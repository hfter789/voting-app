import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  ShareButtons,
  generateShareIcon,
} from 'react-share';

const { FacebookShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');

class VoteSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.onVote = this.onVote.bind(this);
    this.onNewOptionChange = this.onNewOptionChange.bind(this);
  }

  handleChange(e, index, value) {
    this.setState({
      currentOption: value,
    });
  }

  onNewOptionChange(e) {
    this.setState({
      newOption: e.target.value,
    });
  }

  onVote() {
    const { currentOption, newOption } = this.state;
    const { voteInfo: { voteOptions } } = this.props;
    if (currentOption === voteOptions.length) {
      this.props.handleVote(this.props.voteInfo, null, newOption);
    } else {
      this.props.handleVote(this.props.voteInfo, this.state.currentOption);
    }
  }

  canSubmitVote() {
    const { currentOption, newOption } = this.state;
    const { voteInfo: { voteOptions } } = this.props;
    return (currentOption >= 0 && currentOption !== voteOptions.length) ||
      (currentOption === voteOptions.length && newOption);
  }

  renderNewOption() {
    const { voteInfo: { voteOptions }, errorMessage } = this.props;
    const { currentOption } = this.state;
    if (currentOption === voteOptions.length) {
      return (
        <TextField
          hintText="What do you want to add?"
          onChange={this.onNewOptionChange}
        />
      );
    }
  }

  render() {
    const { voteInfo: { topic, voteOptions, id }, errorMessage } = this.props;
    const { currentOption } = this.state;
    const containerStyle = {
      width: '40%',
      textAlign: 'left',
      display: 'inline-block',
      verticalAlign: 'top',
      padding: '70px 0 0 200px',
      boxSizing: 'border-box',
    };

    return (
      <div style={containerStyle}>
        <h2 style={{ margin: 0 }}> {topic} </h2>
        <SelectField
          floatingLabelText="I am voting for"
          value={currentOption}
          onChange={this.handleChange}
        >
          {voteOptions.map((voteOption, index) => {
            return <MenuItem value={index} primaryText={voteOption.desc} />;
          })}
          <MenuItem value={voteOptions.length} primaryText="Add my own... " />
        </SelectField>
        <br />
        {this.renderNewOption()}
        <div style={{ color: '#F44336' }}>{errorMessage}</div>
        <RaisedButton
          disabled={!this.canSubmitVote()}
          label="Submit"
          primary={true}
          style={{ marginTop: 20, marginBottom: 20 }}
          onClick={this.onVote}
        />
        <FacebookShareButton
            url={`${String(window.location)}/vote/${id}`}
            title={topic}
        >
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
      </div>
    );
  }
}

export default VoteSection;
