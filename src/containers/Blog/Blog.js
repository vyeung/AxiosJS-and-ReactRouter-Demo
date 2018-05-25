import React, { Component } from 'react';
import './Blog.css';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import Axios from "axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPost: null,
    hasError: false
  }
  
  componentDidMount() 
  {
    //sending a GET request to server
    Axios.get("/posts")
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
      })
      .catch(error => {
        this.setState({hasError: true});
      });
  }

  postSelectedHandler = (id) => {
    const postToPass = this.state.posts.filter(post => post.id === id);
    this.setState({selectedPost: postToPass});
    console.log(postToPass);
  }
  
  render() {
    //render setup of data we fetched
    let postsArray;
    
    if(this.state.hasError === true) {
      postsArray = <p className="blogParaCenter">Couldn't Get Posts!</p>
    }
    else {
      postsArray = this.state.posts.map(postElement => {
        return ( 
          <Post 
            key={postElement.id} 
            myTitle={postElement.title} 
            myAuthor={postElement.author}
            clicked={() => this.postSelectedHandler(postElement.id)} />
        );
      });
    }

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