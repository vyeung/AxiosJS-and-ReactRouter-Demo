import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import "./Posts.css";
import SinglePost from "../../../components/SinglePost/SinglePost";
import FullPost from "../FullPost/FullPost";
import axios from "axios";

class Posts extends Component {
  state = {
    posts: [],
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
    //if you didn't want to use <Link>
    //this.props.history.push("/postNumber/" + id);
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
          <Link to={"/postNumber" + postElement.id} key={postElement.id}>
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
      <div>
        <section className="Posts">
          {fetchedPosts}
        </section>

        {/*a dynamic route parameter*/}
        <Route path="/postNumber:id" exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;