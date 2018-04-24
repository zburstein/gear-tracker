import React, { Component } from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";


var App = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar/>
          </div>
        </div>
      </div>
    </div>
  );

}

export default App;
