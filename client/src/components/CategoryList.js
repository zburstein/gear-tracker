import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Category from "./Category";

const CategoryList = ({categories, currentPack, createCategory, editCategory, updateCategory, deleteCategory, createGearItem}) => {
  return(
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <Category category={category} editCategory={editCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} createGearItem={createGearItem} displayMetric={currentPack.display_metric}/>
        </div>
      ))}
      <button className="add-button" onClick={() => createCategory(currentPack.id)}> 
        <FontAwesome name='plus' size="1x" className="button-icon"/>
        Add category
      </button>
    </div>
  )
}


export default CategoryList