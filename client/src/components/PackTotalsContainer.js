import React, { Component } from 'react';
import { connect } from 'react-redux';
import PackTotals from './PackTotals';

const mapStateToProps = state => {
  const pack = state.packs.find(pack => pack.id === state.currentPack);
  return{
    pack: pack
  }
}

/*
const mapDispatchToProps = dispatch => {
  return{
    editPack: () => dispatch(editPack())
  }
}
*/

const PackTotalsContainer = connect(
  mapStateToProps
)(PackTotals)

export default PackTotalsContainer