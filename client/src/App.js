import React  from 'react';
import './App.css';
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Loader from "./components/Loader";
import Alert from "./components/Alert"
import { connect } from 'react-redux';
import {removeAlert} from "./actions/alertActions";

const mapStateToProps = state => {
  return{
    currentPackID: state.currentPackID,
    isInitiated: state.isInitiated,
    alert: state.alert
  }
}

const mapDispatchToProps = dispatch => {
  return{
    removeAlert: () => dispatch(removeAlert())
  }
}

const App = ({currentPackID, isInitiated, alert, removeAlert}) => {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 sidebar">
            <Sidebar/>
          </div>
          <div className="col-9 offset-3 editor">
            <div className="container">
              {alert && <Alert alert={alert} removeAlert={removeAlert}/>}

              {isInitiated ? <Editor currentPackID={currentPackID}/> : <Loader/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
;
