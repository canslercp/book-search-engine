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
    //book queries
       books: async (parent, { _id }) => {
        const params = _id ? {id} : {};
        return Book.find(params);
       },
    },
    Mutation: {
    
    }
}