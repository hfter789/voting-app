/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import {
  getVoteList,
  getVoteById,
  voteForOption,
  getUserPoll,
  createPoll,
  deletePoll,
} from './database';

import {
  getUser
} from './auth';

/**
 * Define your own types here
 */

const voteOptionType = new GraphQLObjectType({
  name: 'VoteOption',
  description: 'the vote option description and vote option count',
  fields: () => ({
    desc: {
      type: GraphQLString,
    },
    voteCount: {
      type: GraphQLInt,
    }
  }),
});

const voteType = new GraphQLObjectType({
  name: 'VoteInfo',
  description: 'vote summary about how many votes each options get',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    topic: {
      type: GraphQLString
    },
    voteOptions: {
      type: new GraphQLList(voteOptionType),
    }
  })
});

const VoteRoot = new GraphQLObjectType({
  name: 'VoteRoot',
  description: 'root of the query',
  fields: () => ({
    vote: {
      type: new GraphQLList(voteType),
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (userId, args) => {
        return getVoteById(args.id)
      }
    },
    userVote: {
      type: new GraphQLList(voteType),
      args: {
        userId: {
          type: GraphQLString
        }
      },
      resolve: (userId, args) => {
        if (userId) {
          return getUserPoll(userId)
        }
        return null;
      }
    }
  }),
});

const VoteForOptionMutation = mutationWithClientMutationId({
  name: 'voteForOption',
  inputFields: {
    id: { type: GraphQLInt },
    voteOptionIndex: { type: GraphQLInt },
    userId: { type: GraphQLString }
  },
  outputFields: {
    voteInfo: {
      type: new GraphQLList(voteType),
      resolve: ({id}) => getVoteById(id),
    },
    error: {
      type: GraphQLString,
      resolve: ({id, result}) => result,
    },
  },
  mutateAndGetPayload: ({id, voteOptionIndex, userId}) => {
    const result = voteForOption(id, voteOptionIndex, userId);
    return {id, result};
  },
});

const CreatePollMutation = mutationWithClientMutationId({
  name: 'createPollMutation',
  inputFields: {
    topic: { type: new GraphQLNonNull(GraphQLString) },
    voteOptions: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  outputFields: {
    voteInfo: {
      type: new GraphQLList(voteType),
      resolve: ({id}) => getVoteById(id),
    },
  },
  mutateAndGetPayload: ({topic, voteOptions, userId}) => {
    const id = createPoll(topic, voteOptions, userId);
    return { id };
  },
});

const DeletePollMutation = mutationWithClientMutationId({
  name: 'deletePollMutation',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: new GraphQLNonNull(GraphQLString) }
  },
  mutateAndGetPayload: ({id, userId}) => {
    deletePoll(id, userId);
    return {};
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    voteForOption: VoteForOptionMutation,
    createPoll: CreatePollMutation,
    deletePoll: DeletePollMutation,
  }),
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    root: {
      type: VoteRoot,
      resolve: (arg1, arg2, req) => {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const { headers: { authorization } } = req;
        return getUser(authorization, ip);
      }
    }
  },
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
