import Goals from './goals';

export default {
  Mutation: {
    createGoal(obj, { name, resolutionID }, context) {
      const goalID = Goals.insert({
        name,
        resolutionID,
        completed: false,
      });
      return Goals.findOne(goalID);
    },
    toggleGoal(obj, { _id }) {
      const goal = Goals.findOne(_id);
      Goals.update(_id, {
        $set: {
          completed: !goal.completed
        }
      });
      return Goals.findOne(_id);
    }
  }
};
