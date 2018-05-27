import React from 'react';
import './SinglePost.css';

const singlePost = (props) => {
  return (
    <article className="SinglePost" onClick={props.clicked}>
      <h1>{props.myTitle}</h1>
      <div className="Info">
        <div className="Author">{props.myAuthor}</div>
      </div>
    </article>
  );
};

export default singlePost;