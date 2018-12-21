import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_HI = gql`
  {
    hi
  }
`;

export default class App extends Component {
  render() {
    return (
      <Query query={GET_HI}>
        {
          ({ loading, error, data }) => {
            if (loading) {
              return <h1>Loading...</h1>
            } else if (error) {
              console.log(error);
            } else {
              return <h1>{data.hi}</h1>
            }
          }
        }
      </Query>
    )
  }
}
