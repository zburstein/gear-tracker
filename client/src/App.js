import React  from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Loader from "./components/Loader";
import Alert from "./components/Alert"
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return{
    currentPackID: state.currentPackID,
    isInitiated: state.isInitiated,
    alert: state.alert
  }
}

const App = ({currentPackID, isInitiated, alert}) => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar/>
          </div>
          <div className="col-9 offset-3 editor">
            <div className="container">
              {alert && <Alert alert={alert}/>}

              {isInitiated ? <Editor currentPackID={currentPackID}/> : <Loader/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(App)
;
