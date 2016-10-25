import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className='text-center'>
        <h2> Go Vote! </h2>
        <h4> Below are polls hosted by Go Vote!. </h4>
        <h4> Select a poll to see the results and vote, or sign-in to make a new poll. </h4>
      </div>
    );
  }
}

export default Home;
