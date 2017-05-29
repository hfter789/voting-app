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
  log('info', `get vote by id: ${id}`);
  const query = {};
  if (id) {
    query.id = +id;
  }
  const result = await voteListCollection.find(query).toArray();
  log('info', `Result for id:${id} has size ${result.length}`);
  return result;
};

export const getUserPoll = async userId => {
  const result = await voteListCollection.find({author: userId}).toArray();
  log('info', `${userId} gets user poll: ${result.length} result(s)`);
  return result;
};

export const voteForOption = async (id, voteOptionIndex, newVoteOption, userId) => {
  log('info', `Vote for option id: ${id}, voteOptionIndex: ${voteOptionIndex}, newVoteOption: ${newVoteOption}, userId: ${userId}`)
  if(!id || !userId) {
    const error = `Id and userId cannot be undefined. Have id: ${id}, userId: ${userId}`;
    log('error', error);
    throw error;
  }
  const voteItems = await getVoteById(id);
  if (voteItems.length) {
    const voteItem = voteItems[0];
    if (userId in voteItem.voteHistory) {
      log('info', `${userId} tried to vote twice. Rejected.`);
      throw 'Same user/ip cannot vote twice';
    } else {
      // voting on existing vote option
      if (voteOptionIndex !== null && voteOptionIndex !== undefined) {
        await voteListCollection.updateOne({id: id}, {
          $inc: {
            [`voteOptions.${voteOptionIndex}.voteCount`]: 1
          },
          $set: {
            [`voteHistory.${userId}`]: voteOptionIndex,
          }
        });
        log('info', `${userId} voted for ${voteOptionIndex} in ${id}`);
      } else if (newVoteOption) {
        // new vote option is created
        await voteListCollection.updateOne({id: id}, {
          $push: {
            voteOptions: {
              desc: newVoteOption,
              voteCount: 1,
            },
          },
          $set: {
            [`voteHistory.${userId}`]: voteItem.voteOptions.length,
          }
        });
        // voteItem.voteHistory[userId] = voteItem.voteOptions.length - 1;
        log(
          'info',
          `${userId} created a new option ${newVoteOption} for ${id}`
        );
      } else {
        throw 'Please provide either voteOptionIndex or newVoteOption';
      }
      return null;
    }
  } else {
    throw 'Vote Item not found';
  }
};
