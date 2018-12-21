import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_HI = gql`
  {
    hi
    resolutions {
      _id
      name
    }
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
              return (
                <Fragment>
                  <h1>{data.hi}</h1>
                  <ul>
                    {
                      data.resolutions.map(resolution => (
                        <li key={resolution.id}>
                          {resolution.name}
                        </li>
                      ))
                    }
                  </ul>
                </Fragment>
              )
            }
          }
        }
      </Query>
    )
  }
}
