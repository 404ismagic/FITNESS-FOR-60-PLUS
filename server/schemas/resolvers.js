const { AuthenticationError } = require("apollo-server-express");
const { Profile } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    search: async (parent, { search }) => {
      try {
        const response = await axios(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-app-id": process.env.API_ID,
              "x-app-key": process.env.API_KEY,
            },
          }
        );
       console.log(response)
        return response.data.common 
      } catch (error) {
        console.log(error)

      }
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (parent, { profileId }) => {
      return Profile.findOneAndDelete({ _id: profileId });
    },
    saveFood: async (parent, args, context) => {
      try {
        console.log(context.user);
        const updatedUser = await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedFoods: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError("Incorrect password!");
      }
    },
  },
};

module.exports = resolvers;
