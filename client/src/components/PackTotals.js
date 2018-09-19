import React from 'react';
import convert from 'convert-units';
import {Doughnut} from 'react-chartjs-2';


function handleSubmit(event){
  //if submit, prevent reload and blur, which will trigger submit below
  if(event.type === "submit"){
    event.preventDefault();
    document.activeElement.blur();
  }
}

const PackTotals = ({pack, categories, editPack, updatePack}) => {
  var colorArray = ["blue", "green", "red", "teal", '#FF6633', '#00B3E6', 
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  var data = {
    datasets: [{
        data: categories.map(c => Math.round(convert(c.weight_in_grams).from("g").to(pack.display_metric) * 100) / 100),
        backgroundColor: colorArray
    }],
    labels: categories.map(c => c.name)
  };

  var options = {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return `${data.labels[tooltipItem.index]}: ${data.datasets[0].data[tooltipItem.index]} ${pack.display_metric}(s)`;          
        }
      }
    },
    legend: {
      position: "left"
    }
  };

  if(pack){
    return(
      <form onSubmit={(event) => handleSubmit(event)} onBlur={() => updatePack(pack)}>
        <input className="pack-name" name="name" value={pack.name} onChange={(event) => editPack(pack.id, event)}/>
        {"Total: " + Math.round( convert(pack.weight_in_grams).from("g").to(pack.display_metric) * 100) / 100}
        <select name="display_metric" value={pack.display_metric} onChange={(event) => editPack(pack.id, event)}>
          <option value="g">g</option>
          <option value="oz">oz</option>
          <option value="lb">lb(s)</option>
          <option value="kg">kg</option>
        </select>
        <Doughnut data={data} options={options}/>
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