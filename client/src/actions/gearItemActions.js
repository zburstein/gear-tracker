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
export function editGearItem(id, event){
  return{
    type: 'EDIT_GEAR_ITEM',
    id: id,
    targetName: event.target.name,
    value: event.target.value
  }
}