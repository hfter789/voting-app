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
  voteForOption
} from './database';

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

const voteListType = new GraphQLObjectType({
  name: 'VoteList',
  description: 'list of vote topics, vote options, and count',
  fields: () => ({
    voteList: {
      type: new GraphQLList(voteType),
    }
  })
});

const VoteForOptionMutation = mutationWithClientMutationId({
  name: 'voteForOption',
  inputFields: {
    id: { type: GraphQLInt },
    voteOptionIndex: { type: GraphQLInt },
  },
  outputFields: {
    voteInfo: {
      type: voteType,
      resolve: ({id}) => getVoteById(id),
    },
  },
  mutateAndGetPayload: ({id, voteOptionIndex}) => {
    voteForOption(id, voteOptionIndex);
    return {id, voteOptionIndex};
  },
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    voteForOption: VoteForOptionMutation,
  }),
});

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    voteList: {
      type: voteListType,
      resolve: () => getVoteList(),
    },
    vote: {
      type: voteType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve: (src, args) => {
        if (args.id) {
          return getVoteById(args.id)
        }
        return null;
      }
    }
  }),
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
