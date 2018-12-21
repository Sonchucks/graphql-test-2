import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`;

export default class ResolutionForm extends Component {
  submitMutation = (postMutation, input) => {
    postMutation({
      variables: {
        name: input
      },
      refetchQueries: ['Resolutions']
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    return (
      <Mutation mutation={createResolution}>
        {createResolution => (
          <Fragment>
            <input type='text' ref={input => {this.name = input}}/>
            <button onClick={() => this.submitMutation(createResolution, this.name.value)}>
              Submit
            </button>
          </Fragment>
        )}
      </Mutation>
    )
  }
}
