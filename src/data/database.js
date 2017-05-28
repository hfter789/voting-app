import { log } from 'winston';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/test';

let currentId = 6;
let voteList = [
  {
    id: 1,
    author: '1153276638052704',
    topic: 'Inbox',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5,
      },
      {
        desc: 'desc2',
        voteCount: 10,
      },
    ],
    voteHistory: {},
  },
  {
    id: 2,
    author: '1153276638052704',
    topic: 'Starred',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5,
      },
      {
        desc: 'desc2',
        voteCount: 10,
      },
    ],
    voteHistory: {
      1153276638052704: 0,
    },
  },
  {
    id: 3,
    author: 'test1',
    topic: 'Sent mail',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5,
      },
      {
        desc: 'desc2',
        voteCount: 10,
      },
    ],
    voteHistory: {},
  },
  {
    id: 4,
    author: 'test1',
    topic: 'Drafts',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5,
      },
      {
        desc: 'desc2',
        voteCount: 10,
      },
    ],
    voteHistory: {},
  },
  {
    id: 5,
    author: 'test1',
    topic: 'Inbox',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5,
      },
      {
        desc: 'desc2',
        voteCount: 10,
      },
    ],
    voteHistory: {},
  },
];

let voteListCollection;

MongoClient.connect(url, function(err, db) {
  if (err) {
    log('error', err);
  }
  voteListCollection = db.collection('voteList');
  // voteListCollection.insertMany(voteList, (err, result) => {
  //   log('error', err);
  //   log('info', result);
  // });
});

export const createPoll = (topic, voteOptions, author) => {
  log('info', `${author} created a poll on ${topic}`);
  voteList.push({
    id: currentId,
    author,
    topic,
    voteOptions: voteOptions.map(option => ({
      desc: option,
      voteCount: 0,
    })),
    voteHistory: {},
  });
  currentId++;
  return currentId - 1;
};

export const deletePoll = (id, author) => {
  for (let i = 0; i < voteList.length; i++) {
    if (voteList[i].id === +id) {
      voteList.splice(i, 1);
      return null;
    }
  }
  throw 'Id does not exist in vote list';
};

export const getVoteById = async id => {
  log('info', `get vote b Id: ${id}`);
  // if (!id) {
  //   return voteList;
  // }
  const query = {};
  if (id) {
    query[id] = id;
  }
  const result = await voteListCollection.find(query).toArray();
  log('info', `Result for id:${id} has size ${result.length}`);
  return result;
  // const result = voteList.filter(vote => {
  //   return vote.id === +id;
  // });
  //
  // return result;
};

export const getUserPoll = userId => {
  const result = voteList.filter(voteItem => userId === voteItem.author);
  log('info', `${userId} gets user poll: ${result.length} result(s)`);
  return result;
};

export const voteForOption = (id, voteOptionIndex, newVoteOption, userId) => {
  const voteItems = getVoteById(id);
  if (voteItems.length) {
    const voteItem = voteItems[0];
    if (userId in voteItem.voteHistory) {
      log('info', `${userId} tried to vote twice. Rejected.`);
      throw 'Same user/ip cannot vote twice';
    } else {
      if (voteOptionIndex !== null && voteOptionIndex !== undefined) {
        voteItem.voteOptions[voteOptionIndex].voteCount++;
        voteItem.voteHistory[userId] = voteOptionIndex;
        log('info', `${userId} voted for ${voteOptionIndex} in ${id}`);
      } else if (newVoteOption) {
        voteItem.voteOptions.push({
          desc: newVoteOption,
          voteCount: 1,
        });
        voteItem.voteHistory[userId] = voteItem.voteOptions.length - 1;
        log(
          'info',
          `${userId} created a new option ${newVoteOption} for ${id}`
        );
      } else {
        throw 'Please provide either voteOptionIndex or newVoteOption';
      }
      return null;
    }
  }
  throw 'Vote Item not found';
};
