import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Content />
      </>
    );
  }
}

export default App;
