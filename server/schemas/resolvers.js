const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { create } = require('../models/User');

const resolvers = {
    Query: {
    //user queries
       users: async () => {
        return User.find({});
       },
       user: async (parent, { userId }) => {
        return User.findOne({ _id: userId })
       },
       me: async (parent, args, context) => {
        if (context.user) {
            return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in');
       },
    //book queries
       books: async () => {
        return Book.find({});
       },
    },
    Mutation: {
    //user mutations
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!profile) {
                throw new AuthenticationError('No user with this email found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            return { token, profile };
        },

        saveBook: async (parent, { userId, savedBook }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: { savedBooks: savedBook },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            // Throw an error if user attempts this mutation and isn't logged in
            throw new AuthenticationError('You need to be logged in');
        },
        removeBook: async (parent, { savedBook }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: savedBook }},
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in');
        },
    }
}

module.exports = resolvers;