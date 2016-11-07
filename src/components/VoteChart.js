import React, { Component } from 'react';
import { arc, pie } from 'd3';

class VoteChart extends Component {
  constructor(props) {
    super(props);
    this.pie = pie()
    .sort(null)
    .value(function(d) { return d.voteCount; });
    this.arc = arc()
    .outerRadius(40)
    .innerRadius(0);
  }

  render() {
    const { voteOptions } = this.props;
    const arc = this.arc;
    const containerStyle = {
      width: '60%',
      textAlign: 'center',
      display: 'inline-block',
      verticalAlign: 'middle',
    };
    const pieData = this.pie(voteOptions);

    return (
      <div
        style={containerStyle}
      >
        <svg
          style={{width: '100%', height: '100%'}}
          viewBox='0 0 200 200'
        >
          <g transform='translate(100, 100)'>
            {
              pieData.map((arcData, index) => {
                return (
                  <path key={index} d={arc(arcData)} />
                );
              })
            }
          </g>
        </svg>
      </div>
    );
  }
}

export default VoteChart;
