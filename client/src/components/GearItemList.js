import React, { Component } from 'react';
import GearItem from "./GearItem";

const GearItemList = ({gearItems, editGearItem, updateGearItem, deleteGearItem}) => {
  return(
    <div>
      {gearItems.map((gearItem, index) => (
        <div>
          <GearItem gearItem={gearItem} index={index} editGearItem={editGearItem} updateGearItem={updateGearItem} deleteGearItem={deleteGearItem}/>
        </div>
      ))}
    </div>
  )
}

export default GearItemList
