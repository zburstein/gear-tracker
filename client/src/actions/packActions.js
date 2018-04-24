function addPack(pack){
  return{
    type: 'ADD_PACK',
    pack
  }
}

function addCategory(category){
  return{
    type: 'ADD_CATEGORY',
    category
  }
}

function addGearItem(gearItem){
  return{
    type: 'ADD_GEAR_ITEM',
    gearItem
  }
}

export{addPack}