import React, { Component, Fragment } from 'react'
import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import ResolutionForm from './ResolutionForm';
import GoalForm from './GoalForm';
import Goal from './resolutions/Goal'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const resolutionsQuery = gql`
  query Resolutions {
    resolutions {
      _id
      name
      goals {
        _id
        name
        completed
      }
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
                        <Fragment key={resolution._id}>
                          <li>
                            {resolution.name}
                            <ul>
                              {resolution.goals.map(goal => (
                                <Goal key={goal._id} goal={goal} />
                              ))}
                            </ul>
                          </li>
                          <GoalForm resolutionID={resolution._id}/>
                        </Fragment>
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
