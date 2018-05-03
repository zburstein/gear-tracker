import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from "./CategoryList";
import {createCategory, editCategory, updateCategory, deleteCategory} from "../actions/categoryActions"

const mapStateToProps = state => {
  return{
    categories: state.categories,
    currentPackID: state.currentPack
  }
}


const mapDispatchToProps = dispatch => {
  return{
    createCategory: (currentPackID) => dispatch(createCategory(currentPackID)),
    editCategory: (id, event) => dispatch(editCategory(id, event)),
    updateCategory: (category) => dispatch(updateCategory(category)),
    deleteCategory: (id) => dispatch(deleteCategory(id))
  }
}


const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default CategoryListContainer