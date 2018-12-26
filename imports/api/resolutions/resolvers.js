import Resolutions from './resolutions';
import Goals from '../goals/goals';

export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({
        userId
      }).fetch();
    }
  },
  Resolution: {
    goals: (resolution) => {
      return Goals.find({
        resolutionID: resolution._id
      }).fetch()
    }
  },
  Mutation: {
    createResolution(obj, { name }, { userId }) {
      const resolutionID = Resolutions.insert({
        name,
        userId
      });
      return Resolutions.findOne(resolutionID);
    }
  }
};
