import React, { Component } from 'react';
import { Route, NavLink, Switch } from "react-router-dom";
import './Blog.css';
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";

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
          <Route path="/new-post" component={NewPost} />

          {/*when path is /, load Posts component*/}
          <Route path="/" component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default Blog;