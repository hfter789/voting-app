import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class VoteSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.onVote = this.onVote.bind(this);
  }

  handleChange(e, index, value) {
    this.setState({
      value: value
    });
  }

  onVote() {
    this.props.handleVote(this.props.voteInfo, this.state.value);
  }

  render() {
    const { voteInfo, errorMessage } = this.props;
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
        <h2 style={{margin: 0}}> {voteInfo.topic} </h2>
        <SelectField
          floatingLabelText="I'm voting for"
          value={this.state.value}
          onChange={this.handleChange}
        >
          {
            voteInfo.voteOptions.map((voteOption, index) => {
              return <MenuItem value={index} primaryText={voteOption.desc} />
            })
          }
        </SelectField>
        <br />
        <div style={{color: '#F44336'}}>{errorMessage}</div>
        <RaisedButton
          label='Submit'
          primary={true}
          style={{marginTop: '20px'}}
          onClick={this.onVote}
        />
      </div>
    );
  }
}

export default VoteSection;
