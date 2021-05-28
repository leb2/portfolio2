import React from 'react';
import BuiltWith from "../../built_with/built_with";

const BlogEntry = (props: {
  imageSrc: string,
  title: string,
  url: string,
  date: string,
}) => {
  return (
    <div className="blog-entry row">
      <div className="col-md-4">
        <a href={props.url}>
          <img src={props.imageSrc} className="thumbnail" />
        </a>
      </div>
      <div className="col-md-8">
        <a href={props.url}>
          <div className="blog-entry-title">
            { props.title }
          </div>
        </a>
        <div className="author">
          Brendan Le
        </div>
        <div className="date">
          { props.date }
        </div>
      </div>
    </div>
  );
}

export default BlogEntry;
