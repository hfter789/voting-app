let currentId = 6;
let voteList = [
  {
    id: 1,
    author: 'test',
    topic: 'Inbox',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5
      },
      {
        desc: 'desc2',
        voteCount: 10
      }
    ],
    voteHistory: {},
  },
  {
    id: 2,
    author: 'test',
    topic: 'Starred',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5
      },
      {
        desc: 'desc2',
        voteCount: 10
      }
    ],
    voteHistory: {
      test: 0
    },
  },
  {
    id: 3,
    author: 'test1',
    topic: 'Sent mail',
    voteOptions: [
      {
        desc: 'desc',
        voteCount: 5
      },
      {
        desc: 'desc2',
        voteCount: 10
      }
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
        voteCount: 5
      },
      {
        desc: 'desc2',
        voteCount: 10
      }
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
        voteCount: 5
      },
      {
        desc: 'desc2',
        voteCount: 10
      }
    ],
    voteHistory: {},
  },
];

export const createPoll = (topic, voteOptions, author) => {
  voteList.push({
    id: currentId,
    author,
    topic,
    voteOptions: voteOptions.map(option => ({
      desc: option,
      voteCount: 0
    })),
    voteHistory: {}
  });
  currentId++;
  return currentId - 1;
}

export const getVoteById = (id) => {
  if (!id) {
    return voteList;
  }
  const result = voteList.filter((vote) => {
    return vote.id === +id;
  });

  return result;
};

export const getUserPoll = (userId) => {
  const result = voteList.filter((voteItem) => userId === voteItem.author);
  return result;
};

export const voteForOption = (id, voteOptionIndex, userId) => {
  const voteItems = getVoteById(id);
  if(voteItems.length) {
    const voteItem = voteItems[0];
    if(userId in voteItem.voteHistory) {
      throw 'Same user/ip cannot vote twice';
    } else {
      voteItem.voteOptions[voteOptionIndex].voteCount++;
      voteItem.voteHistory[userId] = voteOptionIndex;
      return null;
    }
  }
  throw 'Vote Item not found';
};