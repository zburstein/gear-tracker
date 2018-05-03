export function setGearItems(gearItems){
  return{
    type: 'SET_GEAR_ITEMS',
    gearItems
  }
}
export function addGearItem(gearItem){
  return{
    type: 'ADD_GEAR_ITEM',
    gearItem
  }
}