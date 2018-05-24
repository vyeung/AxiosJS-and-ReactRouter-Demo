import React from 'react';
import './Post.css';

const post = (props) => {
  return (
    <article className="Post">
      <h1>{props.myTitle}</h1>
      <div className="Info">
        <div className="Author">Author</div>
      </div>
    </article>
  );
};

export default post;