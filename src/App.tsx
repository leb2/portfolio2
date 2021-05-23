import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './landing/header';
import Navbar from "./landing/navbar";
import Sections from './landing/sections';
import Footer from './landing/footer';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Sections />
      <Footer />
    </div>
  );
}

export default App;
