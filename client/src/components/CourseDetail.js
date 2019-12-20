import React, { Component } from 'react';
import axios from 'axios'; 
import ReactMarkdown from "react-markdown";


class CourseDetail extends Component {
    constructor(){
      super()
      this.state = {
        course: [],
      };
    }

    componentDidMount() {
      axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
        .then(response => {
          this.setState({
            course: response.data
         })
      })
      .catch(error => {
       // debugger;
         console.log('Error fetching and parsing data', error);
         this.props.history.push('/error');
      });
    }

deleteCourse() {

    axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
    .then(res => {
        const course = res.data;
        this.setState({ course});
        const emailAddress = this.props.context.authenticated.emailAddress;
        const passWord = this.props.context.authenticated.passWord;
    })
}

  render() {
      const {context} = this.props;
      console.log(context);
    return(
      <div> 
        <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
            <span>
                <a className="button" href="update-course.html">Update Course</a>
                <button onClick={ () => this.deleteCourse(this.state.course.id) } >Remove</button>
                </span><a
                className="button button-secondary" href="/">Return to List</a></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By Joe Smith</p>
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