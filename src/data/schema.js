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

import { mutationWithClientMutationId } from 'graphql-relay';

import {
  getVoteById,
  voteForOption,
  getUserPoll,
  createPoll,
  deletePoll,
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
    },
  }),
});

const voteType = new GraphQLObjectType({
  name: 'VoteInfo',
  description: 'vote summary about how many votes each options get',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: ({_id: id,}) => id
    },
    topic: {
      type: GraphQLString,
    },
    voteOptions: {
      type: new GraphQLList(voteOptionType),
    },
  }),
});

const VoteRoot = new GraphQLObjectType({
  name: 'VoteRoot',
  description: 'root of the query',
  fields: () => ({
    vote: {
      type: new GraphQLList(voteType),
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (root, args) => {
        const list = getVoteById(args.id);
        return list;
      },
    },
    userVote: {
      type: new GraphQLList(voteType),
      resolve: (root, args, context, { rootValue: { userId } }) => {
        if (userId) {
          return getUserPoll(userId);
        }
        return [];
      },
    },
  }),
});

const VoteForOptionMutation = mutationWithClientMutationId({
  name: 'voteForOption',
  inputFields: {
    id: { type: GraphQLInt },
    voteOptionIndex: { type: GraphQLInt },
    newVoteOption: { type: GraphQLString },
  },
  outputFields: {
    voteInfo: {
      type: new GraphQLList(voteType),
      resolve: ({ id }) => getVoteById(id),
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
  mutateAndGetPayload: (
    { id, voteOptionIndex, newVoteOption },
    context,
    { rootValue: { userId } }
  ) => {
    const { error } = voteForOption(id, voteOptionIndex, newVoteOption, userId);
    return { id, error };
  },
});

const CreatePollMutation = mutationWithClientMutationId({
  name: 'createPollMutation',
  inputFields: {
    topic: { type: new GraphQLNonNull(GraphQLString) },
    voteOptions: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  },
  outputFields: {
    voteInfo: {
      type: new GraphQLList(voteType),
      resolve: ({ id }) => getVoteById(id),
    },
  },
  mutateAndGetPayload: (
    { topic, voteOptions },
    context,
    { rootValue: { userId } }
  ) => {
    const id = createPoll(topic, voteOptions, userId);
    return { id };
  },
});

const DeletePollMutation = mutationWithClientMutationId({
  name: 'deletePollMutation',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: ({ id }, context, { rootValue: { userId } }) => {
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
      resolve: () => ({}),
    },
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
