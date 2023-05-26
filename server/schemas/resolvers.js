const { AuthenticationError } = require("apollo-server-express");
const { userProfile } = require("../models/Profile");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    profiles: async () => {
      try {
        return Profile.find();
      } catch (error) {
        throw new Error("Error retrieving profiles");
      }
    },

    profile: async (parent, { profileId }) => {
      try {
        const profile = await userProfile.findOne({ _id: profileId });
        if (!profile) {
          throw new Error("Profile not found");
        }
        return profile;
      } catch (error) {
        throw new Error("Error retrieving profile");
      }
    },

    me: async (parent, args, context) => {
      try {
        if (context.user) {
          const profile = await userProfile.findOne({ _id: context.user._id });
          if (!profile) {
            throw new Error("Profile not found");
          }
          return profile;
        } else {
          throw new AuthenticationError("You need to be logged in!");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },

    search: async (parent, { search }) => {
      try {
        const response = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-app-id": process.env.API_ID,
              "x-app-key": process.env.API_KEY,
            },
          }
        );

        console.log(response);
        return response.data.common;
      } catch (error) {
        console.log(error);
        throw new Error("Error searching for data");
      }
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      try {
        const profile = await userProfile.create({ name, email, password });
        const token = signToken(profile);

        return { token, profile };
      } catch (error) {
        throw new Error("Error creating profile");
      }
    },

    login: async (parent, { email, password }) => {
      try {
        const profile = await userProfile.findOne({ email });

        if (!profile) {
          throw new AuthenticationError("No profile with this email found!");
        }

        const correctPw = await profile.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError("Incorrect password!");
        }

        const token = signToken(profile);

        return { token, profile };
      } catch (error) {
        throw new Error("Error during login");
      }
    },

    removeProfile: async (parent, { profileId }) => {
      try {
        return userProfile.findOneAndDelete({ _id: profileId });
      } catch (error) {
        throw new Error("Error removing profile");
      }
    },

    saveFood: async (parent, args, context) => {
      try {
        console.log(context.user);
        const updatedUser = await userProfile.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedFoods: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        console.log(error);
        throw new Error("Error saving food");
      }
    },
  },
};

module.exports = resolvers;