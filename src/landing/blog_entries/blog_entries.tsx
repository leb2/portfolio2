import React from 'react';
import BlogEntry from "./blog_entry";
import './styles.scss'

const BlogEntries = () => {
  return (
    <div className="blog-entries">
      <div className="section padded">
        <div className="section-inner">
          <div className="row section-row">
            <div className="col-md-12">
              <div className="section-header">
                Blog
              </div>
              <BlogEntry
                imageSrc={'/images/anki_viz.png'}
                title="I trained a neural network to predict how well I knew every word in my Japanese vocabulary"
                url="/blog/anki"
                date="May 28, 2021"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogEntries;
