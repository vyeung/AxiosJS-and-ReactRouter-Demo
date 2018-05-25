import React, { Component } from 'react';
import './Blog.css';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null
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

  postSelectedHandler = (id) => {
    const postToPass = this.state.posts.filter(post => post.id === id);
    this.setState({selectedPost: postToPass});
    console.log(postToPass);
  }
  
  render() {
    //render setup of data we fetched
    let postsArray = [];
    postsArray = this.state.posts.map(postElement => {
      return ( 
        <Post 
          key={postElement.id} 
          myTitle={postElement.title} 
          myAuthor={postElement.author}
          clicked={() => this.postSelectedHandler(postElement.id)} />
      );
    });

    return (
      <div>
        <section className="Posts">
          {postsArray}
        </section>
        <section>
          {/*selectedPost is of type [{...}]*/}
          <FullPost selectedPost={this.state.selectedPost}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;