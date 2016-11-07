import React, { Component } from 'react';

class VoteSection extends Component {
  render() {
    const { voteInfo } = this.props;
    const containerStyle = {
      width: "40%",
      textAlign: "center",
      display: "inline-block",
      verticalAlign: 'middle',
    };
    return (
      <div style={containerStyle}>
        <h2> {voteInfo.topic} </h2>
        {
          voteInfo.voteOptions.map((voteOption, index) => {
            return <div key={index}>{voteOption.desc}:{voteOption.voteCount}</div>
          })
        }
      </div>
    );
  }
}

export default VoteSection;
