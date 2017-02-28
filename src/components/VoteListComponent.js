import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class VoteListComponent extends Component {
  render() {
    const { voteList, isOwner=true } = this.props;
    if (!voteList) {
      return null;
    }
    return (
      <List>
        { 
          this.props.voteList.map((voteTopicObj) => {
            return (
              <div style={{ position: 'relative' }}>
                <Link
                  to={`/vote/${voteTopicObj.id}`}
                  key={voteTopicObj.id}
                >
                  <ListItem primaryText={voteTopicObj.topic} />
                </Link>
                {
                  isOwner ?
                  <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                    }}
                  >
                    <MenuItem
                      primaryText="Delete"
                      leftIcon={<Delete color={'#FF4081'} />}
                    />
                  </IconMenu>
                  :
                  null
                }
              </div>
            );
          })
        }
      </List>
    );
  }
}

export default VoteListComponent;
