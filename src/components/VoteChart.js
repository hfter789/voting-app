import React, { Component } from 'react';
import { arc, pie, schemeCategory20b } from 'd3';
import { getRandomColor } from '../util';

class VoteChart extends Component {
  constructor(props) {
    super(props);
    this.pie = pie()
    .sort(null)
    .value(function(d) { return d.voteCount; });
    this.arc = arc()
    .outerRadius(50)
    .innerRadius(0);
  }

  renderLegend() {
    const { voteOptions } = this.props;
    return (
      <ul>
        {
          voteOptions.map((voteItem, index) => {
            return (
              <li
                style={{
                  listStyle: 'none',
                  display: 'inline-block',
                }}
                key={index}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: schemeCategory20b[index],
                    display: 'inline-block',
                    marginRight: '5px',
                    marginLeft: '5px',
                  }}
                />
                { voteItem.desc }
              </li>
            );
          })
        }
      </ul>
    );
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
          viewBox='0 0 200 110'
        >
          <g transform='translate(100, 55)'>
            {
              pieData.map((arcData, index) => {
                let fillColor;
                if (index < 20) {
                  fillColor = schemeCategory20b[index];
                } else {
                  fillColor = getRandomColor();
                }
                return (
                  <g key={index}>
                    <path d={arc(arcData)} fill={fillColor}/>
                  </g>
                );
              })
            }
          </g>
        </svg>
        {
          this.renderLegend()
        }
      </div>
    );
  }
}

export default VoteChart;
