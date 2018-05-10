import React  from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return{
    currentPack: state.currentPackID
  }
}

const App = () => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar/>
          </div>
          <div className="col-9 offset-3 editor">
            <div className="container">
              <Editor/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App)
;
