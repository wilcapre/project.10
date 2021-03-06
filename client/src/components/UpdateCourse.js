import React, { Component } from 'react';
import Form from './Form';

// update course and the initial state value
export default class UpdateCourse extends Component {
    state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '',
      errors: [],
    }

    async componentDidMount() {
        const {context} = this.props;

        await context.data.getCourse(this.props.match.params.id)
          .then(course => {
              const {
                title,
                description,
                estimatedTime,
                materialsNeeded  
              } = course; 

              const name = `${course.User.firstName} ${course.User.lastName}`

            this.setState({
              title, 
              description,
              estimatedTime,
              materialsNeeded,
              name, 
              course 
           })
        })
        .catch(error => {
         // debugger;
           console.log('Error fetching and parsing data', error);
           this.props.history.push('/error');
        });
      }

    //   UpdateCourse() {
    //     axios.update(`http://localhost:5000/api/courses/:id/update${this.props.match.params.id}`)
    //     .then(res => {
    //         const course = res.data;
    //         this.setState({ course});
    //         const emailAddress = this.props.context.authenticated.emailAddress;
    //         const passWord = this.props.context.authenticated.passWord;
    //     })
    // }
    render() {
        const {
          title,
          description,
          estimatedTime,
          materialsNeeded,
          name,
          errors
        } = this.state;
 // return component   
        return (
          <div className="bounds course--detail"> 
            <h1>Update Course</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
              elements={() => (
                  <React.Fragment>
                      <div className="grid-66">
                        <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <input
                          id="title"
                          name="title"
                          className="input-title course--title--input"
                          type="text"
                          value={title}
                          onChange={this.change}
                          placeholder="Course Title..." />
                       <p>by {name}</p>
                       </div>
                       <div className="course--description"> 
                       <textarea
                          id="description"
                          name="description"
                          type="text"
                          value={description}
                          onChange={this.change}
                          placeholder="Course Description..." />
                       </div>
                       </div>
                       <div className="grid-25 grid-right">
                         <div className="course--stats">
                           <ul className="course--stats--list">
                             <li className="course--stats--list--item">
                             <h4>Estimated Time</h4>
                            <input
                              id= "estimatedTime"
                              name = "estimatedTime"
                              type="text"
                              value={estimatedTime}
                              onChange={this.change}
                              placeholder="Hours"/>
                             </li>
                             <li className="course--stats--list--item">
                             <h4>Materials Needed</h4>
                             <textarea
                                id="materialsNeeded"
                                name="materialsNeeded"
                                type="text"
                                value={materialsNeeded}
                                onChange={this.change}
                                placeholder="Materials Needed..." />
                             </li>
                           </ul>
                         </div>
                     </div>
                  </React.Fragment>
              )}
            
            />
          </div>
        );
    }
// updates state with the value
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState(() => {
          return {
            [name]: value
          };
        });
      }
// submit form function by using email and password
    submit = () => {

    const {context} = this.props;
    const id = this.props.match.params.id;
    const {emailAddress} = context.authenticatedUser;
    const password = context.authenticatedUserPassWord;
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded
      } = this.state;
  
      const course = {
        title,
        description,
        estimatedTime,
        materialsNeeded
      };
      context.data.updateCourse(course, id, {emailAddress, password})
      .then( errors => {  
        if (errors.length) {
          this.setState({ errors });
        } else {
            this.props.history.push(`/courses/${id}`);    
        }
      })
      // handle rejected promises
      .catch( err => { 
        console.log(err);
        this.props.history.push('/error');
      });
  }
  // redirect to course route when clicked on the cancel button
  cancel = () => {
    const id = this.props.match.params.id;
    this.props.history.push(`/courses/${id}`);
  }

}
