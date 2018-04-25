import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPack } from "../actions/packActions"
import PacksNav from "./PacksNav"


const mapStateToProps = state =>{
  return{
    packs: state.packs
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAddPackClick: () => dispatch(addPack("New Pack"))
  }
}


const PackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PacksNav)

export default PackList