import React, { Component } from 'react';
import GearItem from "./GearItem";

const GearItemList = ({gearItems, editGearItem}) => {
  return(
    <div>
      {gearItems.map((gearItem, index) => (
        <div>
          <GearItem gearItem={gearItem} index={index} editGearItem={editGearItem}/>
        </div>
      ))}
    </div>
  )
}

export default GearItemList
