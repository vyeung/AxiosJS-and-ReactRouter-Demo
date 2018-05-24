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
      //will have all the data at this point  
      .then(response => {
        const getFirstFour = response.data.slice(0, 4);
        const addAuthor = getFirstFour.map(postElement => {
          //new js obj with author field added / "concatenated"
          return {
            ...postElement,
            author: "Joe"
          }
        });

        this.setState({posts: addAuthor});  //trigger re-render
        console.log(response);
      });
  }
  
  render() {
    //render setup of data we fetched
    let postsArray = [];
    postsArray = this.state.posts.map(postElement => {
      return ( 
        <Post 
          key={postElement.id} 
          myTitle={postElement.title} 
          myAuthor={postElement.author} />
      );
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