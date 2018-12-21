import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import ResolutionForm from './ResolutionForm';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
    }
  }
`;

export default class App extends Component {
  render() {
    return (
      <Query query={resolutionsQuery}>
        {
          ({ loading, error, data: { resolutions } }) => {
            if (loading) {
              return <h1>Loading...</h1>
            } else if (error) {
              console.log(error);
            } else {
              return (
                <Fragment>
                  <LoginForm />
                  <RegisterForm />
                  <button onClick={() => {Meteor.logout()}}>Logout</button>
                  <h1>Resolutions</h1>
                  <ResolutionForm />
                  <ul>
                    {
                      resolutions.map(resolution => (
                        <li key={resolution._id}>
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
