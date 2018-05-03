import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Category from "./Category";

const CategoryList = ({categories, currentPackID, createCategory, editCategory, updateCategory, deleteCategory}) => {
  console.log(categories);
  return(
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <Category category={category} editCategory={editCategory} updateCategory={updateCategory} deleteCategory={deleteCategory}/>
        </div>
      ))}
      <button className="add-button" onClick={() => createCategory(currentPackID)}> 
        <FontAwesome name='plus' size="1x" className="button-icon"/>
        Add category
      </button>
    </div>
  )
}


export default CategoryList