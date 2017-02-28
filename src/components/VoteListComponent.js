import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import get from 'lodash/get';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

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
              <div>
                <Link
                  to={`/vote/${voteTopicObj.id}`}
                  key={voteTopicObj.id}
                >
                  <ListItem primaryText={voteTopicObj.topic} />
                </Link>
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                  targetOrigin={{horizontal: 'left', vertical: 'top'}}
                >
                  <MenuItem primaryText="Refresh" />
                </IconMenu>
              </div>
            );
          })
        }
      </List>
    );
  }
}

export default VoteListComponent;
