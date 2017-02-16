let voteList = [
  {
    id: 1,
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

export const getVoteById = (id) => {
  if (!id) {
    return voteList;
  }
  const result = voteList.filter((vote) => {
    return vote.id === +id;
  });

  return result;
};

export const getVoteHistory = (userId) => {
  return voteList.filter((voteItem) => userId in voteItem.voteHistory);
};

export const voteForOption = (id, voteOptionIndex, userId) => {
  const voteItem = getVoteById(id);
  if(voteItem.voteOptions) {
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