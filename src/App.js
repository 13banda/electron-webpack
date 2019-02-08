import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const mainProcessLog = window.require('electron').remote.process.env
    console.log(mainProcessLog);
    console.log(process);
    console.log(process.env);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
             <pre>
             console.log(mainProcessLog)
             console.log(process.env);
             console.log(process)
              </pre>
             Check console log  with "Ctrl + Shift + i"
          </p>
        </header>
      </div>
    );
  }
}

export default App;
