import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";

// To display course tp user.
class CourseDetail extends Component {
    constructor(){
      super()
      this.state = {
        course: [],
        name: '',
        authUser: false 
      };
    }
// Mount details to page and match params from url  
    async componentDidMount() {
      const { context } = this.props; 
      await context.data.getCourse(this.props.match.params.id)
        .then(response => {
         if (context.authenticatedUser !== null) {
             if (context.authenticatedUser.emailAddress === response.User.emailAddress) {
                 this.setState({
                     authUser: true 
                 });
             } else {
                 this.setState({
                     authUser: false 
                 });
             }
         } 
         this.setState({
            course: response,
            name: `${response.User.firstName} ${response.User.lastName}`
         })
      })
      .catch(error => {
       // debugger;
         console.log('Error fetching and parsing data', error);
         this.props.history.push('/error');
      });
    }
//
  render() {
      console.log(this.state.authUser)
      const {context} = this.props;
      let emailAddress; 
      let password; 
      if (this.state.authUser) {
          emailAddress = context.authenticatedUser.emailAddress
          password = context.authenticatedUserPassWord
      }
    return(
      <div> 
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            {this.state.authUser ?
            <span>
                <a className="button" href={`/courses/${this.state.course.id}/update`}>Update Course</a>
                <button className="button"
                  onClick={ () => context.data.deleteCourse(this.state.course.id, {emailAddress, password}) 
                   .then(()=> this.props.history.push('/'))}>
                  Delete Course
                </button>
            </span>
            :
            <span> </span> 
            }
                <a className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.name}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                   < ReactMarkdown source={this.state.course.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div> 
    )
  }
}



export default CourseDetail;