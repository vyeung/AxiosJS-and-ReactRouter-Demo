import React, { Component } from 'react';
import './Blog.css';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Axios from "axios";

class Blog extends Component {
  state = {
    posts: []
  }
  
  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        this.setState({posts: response.data});
        console.log(response);
      });
  }
  
  render() {
    let postsArray = [];
    postsArray = this.state.posts.map(postElement => {
      return <Post key={postElement.id} myTitle={postElement.title}/>;
    });

    return (
      <div>
        <section className="Posts">
          {postsArray}
        </section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;