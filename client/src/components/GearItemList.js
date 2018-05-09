import React from 'react';
import GearItem from "./GearItem";

const GearItemList = ({gearItems, editGearItem, updateGearItem, deleteGearItem}) => {
  return(
    <div>
      {gearItems.map((gearItem, index) => (
        <GearItem key={index} gearItem={gearItem} index={index} editGearItem={editGearItem} updateGearItem={updateGearItem} deleteGearItem={deleteGearItem}/>
      ))}
    </div>
  )
}

export default GearItemList
