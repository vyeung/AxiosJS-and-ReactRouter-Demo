import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import './Blog.css';
import Posts from "./Posts/Posts";

//import NewPost from "./NewPost/NewPost";
import asyncHOC from "../../asyncHOC";
const asyncNewPost = asyncHOC(() => import("./NewPost/NewPost"));

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

        <Switch>
          {/*handle all routes that start with /new-post*/}
          <Route path="/new-post" component={asyncNewPost} />
          
          {/*when path is /, load Posts component*/}
          <Route path="/" component={Posts} />

          {/* Not working
          <Route render={() => <h1>404 Page Not Found</h1>} /> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;