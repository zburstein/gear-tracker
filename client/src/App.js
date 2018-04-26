import React, { Component } from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";


const App = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar/>
          </div>
          <div className="col-9 editor">
            <div className="container">
              <Editor/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
