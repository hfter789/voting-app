export const getVoteList = () => {
  return {
    voteList: 
      [
        {
          voteId: 1,
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
          voteId: 2,
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
          voteId: 3,
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
          voteId: 4,
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
          voteId: 5,
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
      ]
    };
};