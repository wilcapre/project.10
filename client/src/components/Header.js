import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    //to determine what to display to the user.
    const { context } = this.props; 
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.firstName}!</span>
                <Link className= "/signout" to= "/signout">Sign Out</Link>
                </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )} 
            
          </nav>
        </div>
      </div>
    );
  }
};
