import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from "./CategoryList";
import {createCategory} from "../actions/categoryActions"

const mapStateToProps = state => {
  return{
    categories: state.categories,
    currentPackID: state.currentPack
  }
}


const mapDispatchToProps = dispatch => {
  return{
    createCategory: (currentPackID) => dispatch(createCategory(currentPackID))
  }
}


const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default CategoryListContainer