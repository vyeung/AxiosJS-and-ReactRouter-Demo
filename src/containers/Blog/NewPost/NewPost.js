import React, { Component } from 'react';
import './NewPost.css';
import axios from "axios";
import { Redirect } from "react-router-dom";

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: '',
    submitted: false
  }

  //sending a POST request to server
  addPostHandler = () => {
    const newPost = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    
    axios.post("/posts", newPost)
      .then(response => {
        console.log(response);
        this.setState({submitted: true}); //using Redirect
        //this.props.history.push("/");   //quick alternative
      });
  }

  render() {
    let redirect = null;
    if(this.state.submitted === true) {
      redirect = <Redirect to="/" />
    }

    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input 
          type="text" 
          value={this.state.title} 
          onChange={(event) => this.setState({title: event.target.value})} 
        />
        <label>Content</label>
        <textarea 
          rows="4" 
          value={this.state.content} 
          onChange={(event) => this.setState({content: event.target.value})} 
        />
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
          <option value="Tom">Tom</option>
          <option value="Sara">Sara</option>
        </select>
        <button onClick={this.addPostHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;