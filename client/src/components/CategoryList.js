import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const CategoryList = ({categories, currentPackID, createCategory}) => {
  return(
    <div>
      <button className="add-button" onClick={() => createCategory(currentPackID)}> 
        <FontAwesome name='plus' size="1x" className="button-icon"/>
        Add category
      </button>
    </div>
  )
}


export default CategoryList