import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const toggleGoal = gql`
  mutation toggleGoal($_id: String!) {
    toggleGoal(_id: $_id) {
      _id
    }
  }
`;

export default class Goal extends Component {
  toggleCheckbox = (postMutation) => {
    postMutation({
      variables: {
        _id: this.props.goal._id
      },
      refetchQueries: ['Resolutions']
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    return (
      <li>
        <Mutation mutation={toggleGoal}>
          {toggleGoal => (
            <Fragment>
              <input
                type="checkbox"
                checked={this.props.goal.completed}
                onChange={() => {this.toggleCheckbox(toggleGoal)}}
              />
            </Fragment>
          )}
        </Mutation>
        {this.props.goal.name}
      </li>
    )
  }
}
