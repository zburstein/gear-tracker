import React, { Component } from 'react';
import { connect } from 'react-redux';
import CategoryList from "./CategoryList";
import {createCategory, editCategory, updateCategory, deleteCategory} from "../actions/categoryActions"
import {createGearItem} from "../actions/gearItemActions"

const mapStateToProps = state => {
  const pack = state.packs.find(pack => pack.id === state.currentPackID);
  return{
    categories: state.categories,
    currentPack: pack
  }
}


const mapDispatchToProps = dispatch => {
  return{
    createCategory: (currentPackID) => dispatch(createCategory(currentPackID)),
    editCategory: (id, event) => dispatch(editCategory(id, event)),
    updateCategory: (category) => dispatch(updateCategory(category)),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    createGearItem: (categoryID) => dispatch(createGearItem(categoryID))
  }
}


const CategoryListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)

export default CategoryListContainer