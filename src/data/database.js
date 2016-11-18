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
  },
];

export const getVoteList = () => {
  return {
    voteList: voteList
  };
};

export const getVoteById = (id) => {
  const result = voteList.filter((vote) => {
    return vote.id === +id;
  });
  if (result.length) {
    return result[0];
  }
  return {};
};

export const voteForOption = (id, voteOptionIndex) => {
  const voteItem = getVoteById(id);
  if(voteItem.voteOptions) {
    voteItem.voteOptions[voteOptionIndex].voteCount++;
  }
};