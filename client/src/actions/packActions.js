import Pack from "../components/Pack"

function addPack(pack){
  return{
    type: 'ADD_PACK',
    pack: new Pack()
  }
}

function selectPack(id){
  return{
    type: 'SELECT_CURRENT_PACK',
    id
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

export{addPack, selectPack}