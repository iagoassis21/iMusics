import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Sidebar from './components/Sidebar';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Content />
        <Sidebar />
      </>
    );
  }
}

export default App;
