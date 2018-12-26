import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionID: String!) {
    createGoal(name: $name, resolutionID: $resolutionID) {
      _id
    }
  }
`;

export default class GoalForm extends Component {
  submitMutation = (postMutation) => {
    postMutation({
      variables: {
        name: this.name.value,
        resolutionID: this.props.resolutionID
      },
      refetchQueries: ['Resolutions']
    })
    .then(() => {
      this.name.value = "";
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    return (
      <Mutation mutation={createGoal}>
        {createGoal => (
          <Fragment>
            <input type='text' ref={input => {this.name = input}}/>
            <button onClick={() => this.submitMutation(createGoal)}
            >
              Submit
            </button>
          </Fragment>
        )}
      </Mutation>
    )
  }
}
