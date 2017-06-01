import { log } from 'winston';
import { MongoClient, ObjectId } from 'mongodb';

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/test';

let voteListCollection;

log('info', `Connecting to host ${url}`)
MongoClient.connect(url, async (err, db) => {
  if (err) {
    log('error', err);
  }
  voteListCollection = db.collection('voteList');
});

export const createPoll = async (topic, voteOptions, author) => {
  log('info', `${author} created a poll on ${topic}`);
  await voteListCollection.insertOne({
    author,
    topic,
    voteOptions: voteOptions.map(option => ({
      desc: option,
      voteCount: 0,
    })),
    voteHistory: {},
  });
};

export const deletePoll = async (id, author) => {
  log('info', `author: ${author} request to delete poll with id: ${id}`)
  await voteListCollection.deleteOne({
    _id: ObjectId(id),
    author,
  })
};

export const getVoteById = id => {
  log('info', `get vote by id: ${id}`);
  const query = {};
  if (id) {
    query._id = ObjectId(id);
  }
  return voteListCollection.find(query).toArray();
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
    // throw error;
  }
  const voteItems = await getVoteById(id);
  if (voteItems.length) {
    const voteItem = voteItems[0];
    if (userId in voteItem.voteHistory) {
      log('info', `${userId} tried to vote twice. Rejected.`);
      return { error: 'Same user/ip cannot vote twice' };
    } else {
      // voting on existing vote option
      if (voteOptionIndex !== null && voteOptionIndex !== undefined) {
        await voteListCollection.updateOne({_id: ObjectId(id)}, {
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
        await voteListCollection.updateOne({_id: ObjectId(id)}, {
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
        // throw 'Please provide either voteOptionIndex or newVoteOption';
      }
      return null;
    }
  } else {
    // throw 'Vote Item not found';
  }
};
