import React, { Component } from 'react';
import { Route, NavLink } from "react-router-dom";
import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/" exact> Home </NavLink>
              </li>
              <li>
                {/*can do complex link configs of where to go by making to={{...}}*/}
                <NavLink to={{
                  pathname:"/new-post", 
                  search:"?quick-submit=true"}}> New Post </NavLink>
              </li>
            </ul>
          </nav>
        </header>
      
        {/*when exact path is /, render some JSX*/}
        {/*<Route path="/" exact render={() => <h1>Home</h1>} /> */}
        
        {/*when exact path is /, load a component*/}
        <Route path="/" exact component={Posts} />

        {/*handle all routes that start with /new-post*/}
        <Route path="/new-post" component={NewPost} />
      </div>
    );
  }
}

export default Blog;