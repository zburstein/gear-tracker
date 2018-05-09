import React from 'react';
import FontAwesome from 'react-fontawesome';
import Category from "./Category";

const CategoryList = ({categories, currentPack, createCategory, editCategory, updateCategory, deleteCategory, createGearItem}) => {
  //TODO should I give category its own container that is given the category as props or keep as is
  //TODO give add gear item its own component?
  return(
    <div>
      {categories.map((category, index) => (
          <Category key={index} category={category} editCategory={editCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} createGearItem={createGearItem} displayMetric={currentPack.display_metric}/>
      ))}
      <button className="add-button" onClick={() => createCategory(currentPack.id)}> 
        <FontAwesome name='plus' size="lg" className="button-icon"/>
        Add category
      </button>
    </div>
  )
}


export default CategoryList