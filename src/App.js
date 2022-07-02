import React from 'react';
import Header from './components/Header';
import Content from './components/Content';

class App extends React.Component {
  render() {
    return (
      <>
        <Content />
        <Header />
      </>
    );
  }
}

export default App;
