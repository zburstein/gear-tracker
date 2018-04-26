import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPack, selectPack } from "../actions/packActions"
import PacksNav from "./PacksNav"


const mapStateToProps = state =>{
  return{
    packs: state.packs
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAddPackClick: () => dispatch(addPack("New Pack")),
    onPackSelect: (id) => dispatch(selectPack(id))
  }
}


const PackList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PacksNav)

export default PackList