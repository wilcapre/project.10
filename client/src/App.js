import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';
import Header from './components/Header';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './PrivateRoute'; 

const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail); 
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <Router> 
    <div> 
    <HeaderWithContext />

      <Switch> 
        <Route exact path='/' component={Courses} /> 
        <Route exact path='/courses' component={Courses} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} /> 
        <Route exact path='/courses/:id' component={CourseDetailWithContext} /> 
        <Route path="/signin" render={UserSignInWithContext} />
        <Route path="/signup" render={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
      </Switch> 
    </div> 
  </Router> 
)
