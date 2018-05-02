import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Category from "./Category";

const CategoryList = ({categories, currentPackID, createCategory}) => {
  return(
    <div>
      <button className="add-button" onClick={() => createCategory(currentPackID)}> 
        <FontAwesome name='plus' size="1x" className="button-icon"/>
        Add category
      </button>
      {categories.map((category) => (
        <div>
          <Category category={category}/>
        </div>
      ))}
    </div>
  )
}


export default CategoryList