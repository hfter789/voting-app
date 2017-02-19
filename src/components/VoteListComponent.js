import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import get from 'lodash/get';

class VoteListComponent extends Component {
  render() {
    if (!get(this, 'props.voteList')) {
      return null;
    }
    return (
      <List>
        { 
          this.props.voteList.map((voteTopicObj) => {
            return (
              <Link to={`/vote/${voteTopicObj.id}`} key={voteTopicObj.id}>
                <ListItem primaryText={voteTopicObj.topic} />
              </Link>
            );
          })
        }
      </List>
    );
  }
}

export default VoteListComponent;
