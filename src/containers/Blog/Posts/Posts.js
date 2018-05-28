import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Posts.css";
import SinglePost from "../../../components/SinglePost/SinglePost";
import axios from "axios";

class Posts extends Component {
  state = {
    posts: [],
    //selectedPost: null,
    hasError: false
  }

  componentDidMount()
  {
    //sending GET request to server
    axios.get("/posts")
      //will have all the data at this point  
      .then(response => {
        const getFirstFour = response.data.slice(0, 4);
        const addedAuthor = getFirstFour.map(postElement => {
          //new js obj with author field added / "concatenated"
          return {
            ...postElement,
            author: "Joe"
          }
        });
        this.setState({posts: addedAuthor});  //trigger re-render
        console.log(response);
      })
      .catch(error => {
        this.setState({hasError: true});
        console.log(error);
      });
  }

  postSelectedHandler = (id) => {
    // const postToPass = this.state.posts.filter(post => post.id === id);
    // this.setState({selectedPost: postToPass});
    // console.log(postToPass);
  }
  
  render() {
    let fetchedPosts;
    if(this.state.hasError === true) {
      fetchedPosts = <p className="postsParaCenter">Couldn't Get Posts!</p>
    }
    else {
      //will be of type [{}]
      fetchedPosts = this.state.posts.map(postElement => {
        return ( 
          //specifying path for the dynamic route in Blog.js
          <Link to={"/" + postElement.id} key={postElement.id}>
            <SinglePost 
              myTitle={postElement.title} 
              myAuthor={postElement.author}
              clicked={() => this.postSelectedHandler(postElement.id)} 
            />
          </Link>
        );
      });
    }

    return (
      <section className="Posts">
        {fetchedPosts}
      </section>
    );
  }
}

export default Posts;