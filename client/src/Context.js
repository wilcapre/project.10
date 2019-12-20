import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser:  Cookies.getJSON('authenticatedUser') || null,
    authenticatedUserPassWord:  Cookies.getJSON('authenticatedUserPassWord') || null
  };
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, authenticatedUserPassWord} = this.state;

    const value ={
      //adding the authenticatedUser variable 
      authenticatedUser,
      authenticatedUserPassWord,
      data: this.data,
       //new property named actions
      actions: { // Add the 'actions' property and object
      signIn: this.signIn,
      signOut: this.signOut
    },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    //checks if the value of user is not equal to null
    if (user !== null) {
      this.setState(() => {
        return {
          // update the authenticatedUser state to the value of user
          authenticatedUser: user,
          authenticatedUserPassWord: password
        };
      });
      // Set cookie and cookie name for 
      //first argument 
      // json as 2nd argument 
      //and last argument as an object {}
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
      Cookies.set('authenticatedUserPassWord', JSON.stringify(password), { expires: 1});
    }
  return user;
  }

  signOut = () => {
    //removes the name and username properties from state
    this.setState(() => { 
      return{
      authenticatedUser: null,
      authenticatedUserPassWord: null,
      };
    });
    // add the Cookies.remove() method
    // pass the name of the cookie to delete ('authenticatedUser')
    Cookies.remove('authenticatedUser');
    Cookies.remove('authenticatedUserPassWord');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

