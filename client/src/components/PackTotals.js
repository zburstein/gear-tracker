import React, { Component } from 'react';
import convert from 'convert-units';



const PackTotals = ({pack, editPack, updatePack}) => {
  if(pack){
    return(
      <form onSubmit={() => updatePack(pack)} onBlur={() => updatePack(pack)}>
        <input className="pack-name" name="name" value={pack.name} onChange={(event) => editPack(pack.id, event)}/>
        {"Total: " + Math.round( convert(pack.weight_in_grams).from("g").to(pack.display_metric) * 100) / 100}
        <select name="display_metric" value={pack.display_metric} onChange={(event) => editPack(pack.id, event)}>
          <option value="g">g</option>
          <option value="oz">oz</option>
          <option value="lb">lb(s)</option>
          <option value="kg">kg</option>
        </select>
      </form>
    )
  }
  else{
    return(
      <div>
        Not loaded
      </div>
    )
  }
}
export default PackTotals