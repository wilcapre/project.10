import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: []
  }

  render() {
    // //specifying the parameters username and password 
    // signIn = async (emailAddress, password, errors) => {
    //   const user = await this.data.getUser(emailAddress, password, errors);
    //   return user;
    // }
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            errors={errors}
            cancel={this.cancel}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="Email Address" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />  
                   <div class="grid-100 pad-bottom">
                   </div>              
              </React.Fragment>
            )} />
          <p>
            Don't have a user account?
             <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    //update the submit() function
    const { emailAddress, password } = this.state;

    context.actions.signIn(emailAddress, password)
    .then( user => {
      if (user === null) {
        this.setState(() => {
          return { errors: [ 'Sign-in was unsuccessful' ] };
        });
      }  else {
        this.props.history.push('/');
        console.log(`SUCCESS! ${emailAddress} is now signed in!`);
     } 

    })
    .catch(err => {
      console.log(err);
      //use history and the push() method to navigate the user from /signin to /error
      this.props.history.push('/error');
    });
  }

  cancel = () => {
    this.props.history.push('/');
  }
}