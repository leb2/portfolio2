import React from 'react';
import Header from "./header";
import Sections from "./sections";
import Footer from "./footer";
import './styles.scss'
import Page from '../shared/page'

const Landing = () => {
  return (
    <Page className="landing" absoluteNavbar noContainer>
      <Header />
      <Sections />
      <Footer />
    </Page>
  );
}

export default Landing;
