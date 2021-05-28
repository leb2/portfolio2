import React from 'react';
import Header from "./header";
import Sections from "./sections";
import BlogEntries from "./blog_entries/blog_entries";
import Footer from "./footer";
import './styles.scss'
import Page from '../shared/page'

const Landing = () => {
  return (
    <Page className="landing" absoluteNavbar noContainer>
      <Header />
      <Sections />
      <BlogEntries />
      <Footer />
    </Page>
  );
}

export default Landing;
