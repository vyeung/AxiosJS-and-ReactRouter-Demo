import React, { Component } from 'react';
import './FullPost.css';
import axios from "axios";

class FullPost extends Component 
{
  state = {
    loadedPost: null,
    hasError: false
  }

  componentDidMount() {
    //console.log(this.props);
    if(this.props.match.params.id != null) {
      axios.get('/posts/' + this.props.match.params.id)
        .then(response => {
          this.setState({loadedPost: response.data});
        })
        .catch(error => {
          this.setState({hasError: true});
        });  
    }
  }

  //without this, only the first post clicked ever shows
  componentDidUpdate() {
    if(this.props.match.params.id !== null) {
      if(this.state.loadedPost && this.state.loadedPost.id !== Number(this.props.match.params.id)) { 
        axios.get('/posts/' + this.props.match.params.id)
          .then(response => {
            this.setState({loadedPost: response.data});
          })
          .catch(error => {
            this.setState({hasError: true});
          });
      }
    }  
  }

  //sending a DELETE request to server
  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    let post;

    if(this.state.hasError === true) {
      return post = <p className="paraCenter">Couldn't Get Post!</p>;
    }
    if(this.props.match.params.id != null) {
      post = <p className="paraCenter">Loading...!</p>;
    }
    if(this.state.loadedPost != null){
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button 
              onClick={this.deletePostHandler} 
              className="Delete"
              >Delete</button>
          </div>
        </div>
      );
    }

    //will be p tag or div
    return post;
  }
}

export default FullPost;