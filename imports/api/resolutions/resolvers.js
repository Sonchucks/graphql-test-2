import Resolutions from './resolutions';


export default {
  Query: {
    resolutions(obj, args, { userId }) {
      return Resolutions.find({
        userId
      }).fetch();
    }
  },
  Mutation: {
    createResolution(obj, { name }, context) {
      const resolutionID = Resolutions.insert({
        name
      });
      return Resolutions.findOne(resolutionID);
    }
  }
};
