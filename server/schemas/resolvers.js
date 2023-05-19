const { AuthenticationError } = require('apollo-server-express')
const { Profile } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find()
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId })
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },


  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password })
      const token = signToken(profile)

      return { token, profile }
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email })

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!')
      }

      const correctPw = await profile.isCorrectPassword(password)

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!')
      }

      const token = signToken(profile)
      return { token, profile }
    },

    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId })
    },
    saveFood:async (parent,args,context) => {  
      try {
        console.log(context.user)
        const updatedUser = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedFoods: args } },
          { new: true, runValidators: true }
        );
        return updatedUser
      } catch (err) {
        console.log(err);
        throw new AuthenticationError('Incorrect password!')
      }
    },
  },
};

module.exports = resolvers;
