import React, { Component, Fragment } from 'react'
import { Query, withApollo } from 'react-apollo';
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
    user {
      _id
    }
  }
`;

class App extends Component {
  render() {
    const resetStore = this.props.client.resetStore
    return (
      <Query query={resolutionsQuery}>
        {
          ({ loading, error, data: { resolutions, user } }) => {
            if (loading) {
              return <h1>Loading...</h1>
            } else if (error) {
              console.log(error);
            } else {
              return (
                <Fragment>
                  { user._id ? (
                    <button onClick={() => {
                      Meteor.logout()
                      resetStore();
                    }}>Logout</button>
                  ) : (
                    <Fragment>
                      <LoginForm reset={resetStore} />
                      <RegisterForm reset={resetStore} />
                    </Fragment>
                  )}
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

export default withApollo(App);
