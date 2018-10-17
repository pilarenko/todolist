import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import Layout from '../Layout/Layout';
import Footer from '../../components/Footer/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Layout />
        <Footer />
      </div>
    );
  }
}

export default App;
