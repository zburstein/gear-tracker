import React, { Component } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import './App.css';
import axios from 'axios';
import update from 'immutability-helper';
import convert from 'convert-units';

//TODO Use Redux instead

class App extends Component {
  constructor(props){
    super(props);

    //bind in constructor for performance
    this.setCurrentPackList = this.setCurrentPackList.bind(this);
    this.createPackList = this.createPackList.bind(this);
    this.editPackList = this.editPackList.bind(this);
    this.updatePackList = this.updatePackList.bind(this);
    this.deletePackList = this.deletePackList.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.editCategoryName = this.editCategoryName.bind(this); 
    this.updateCategory = this.updateCategory.bind(this);
    this.editGearItem = this.editGearItem.bind(this);
    this.updateGearItem = this.updateGearItem.bind(this);
    this.newGearItem = this.newGearItem.bind(this);
    this.createGearItem = this.createGearItem.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.deleteGearItem = this.deleteGearItem.bind(this);


    this.state = {
      packLists: [],
      currentPackList: undefined,
    };
  }

  //get intial data after the component mounts
  componentDidMount(){
    //get the list of packs(shallow) 
    axios.get("https://backpacking-gear-tracker.herokuapp.com/pack_lists")
    .then(response => {

      //set the state with the response
      var packLists = response.data;
      this.setState({
        packLists: packLists
      });

      //then use get a Packlist with all associated objects
      this.setCurrentPackList(packLists[0].id);

    })
    .catch(error => console.log(error));
  }

  ///********Pack List API**********///
  //get the deep copy of the pack list with categories and the gear items
  setCurrentPackList(id){
    axios.get(`https://backpacking-gear-tracker.herokuapp.com/pack_lists/${id}`)
    .then(response => {
      //set current packList
      this.setState({
        currentPackList: response.data
      });

    })
    .catch(error => console.log(error));
  }



  createPackList(){
    axios.post(`https://backpacking-gear-tracker.herokuapp.com/pack_lists`, {
      pack_list: {name: "Pack Name"}
    })
    .then(response => {
      //make a shallow pack to update the packLists array
      var shallowPack = {name: response.data.name, id: response.data.id};
      const packLists = update(this.state.packLists, {$push: [shallowPack]});

      //then update with new packList
      this.setState({
        currentPackList: response.data,
        packLists: packLists
      })
    })
  }

  //edite pack list direct properties (not children)
  editPackList(event){
    const updatedPackList = update(this.state.currentPackList, {[event.target.name]: {$set: event.target.value}});
    this.setState({currentPackList: updatedPackList});
  }

  //update PackList direct properites (not children)
  updatePackList(editedPackList){
    const packListRequest = {name: editedPackList.name, display_metric: editedPackList.display_metric};
    axios.put(`https://backpacking-gear-tracker.herokuapp.com/pack_lists/${editedPackList.id}`, {
      pack_list: packListRequest
    })
    .then(response => {

    })
    .catch(error => console.log(error)); 
  }

  deletePackList(packListIndex){
    //get the pack list to be delete
    const deletePackList = this.state.packLists[packListIndex];

    //then determine which will be the next focused pack list and set it
    if(deletePackList.id === this.state.currentPackList.id){
      //if the last one then set current Pack list to null because there will be none left
      if(this.state.packLists.length === 1){
        this.setState({currentPackList: null});
      }
      //else set the next viewed packlist
      else{
        var newCurrentPackList = (packListIndex === this.state.packLists.length - 1) ? this.state.packLists[packListIndex - 1] : this.state.packLists[packListIndex + 1];
        this.setCurrentPackList(newCurrentPackList.id);
      }
    }

    //delete from server
    axios.delete(`https://backpacking-gear-tracker.herokuapp.com/pack_lists/${deletePackList.id}`)
    .then(response => {
      //remove the pack list and set state
      const updatedPackLists = update(this.state.packLists, {
        $splice: [[[packListIndex], 1]]
      });
      this.setState({
        packLists: updatedPackLists
      });
    })
    .catch(error => console.log(error)); 

  }


  //**********current pack list*********/
  /////////categories//////////////
  createCategory(){
    //create gearItem and Cateogry object
    const newGearItem = {name: "", description: "", weight_in_grams: 0, display_metric: "g", quantity: 1, worn: false, favorite: false, consumable: false}; 
    const newCategory = {name: "", weight_in_grams: 0, pack_list_id: this.state.currentPackList.id, gear_items: [newGearItem]};
    
    //then update and set state
    const updatedPackList = update(this.state.currentPackList, {
      categories: {$push: [newCategory]}
    });
    this.setState({
      currentPackList: updatedPackList
    });
    
    //get the index so it can be updated in axios response
    var categoryIndex = this.state.currentPackList.categories.length 

    //meanwhile, make api call to create the category on server
    axios.post(
      `https://backpacking-gear-tracker.herokuapp.com/categories/`,
      {
        category: newCategory
      })

    .then(response => {
      //when successful update state with the id
      const updatedPackList = update(this.state.currentPackList, {
        categories: {
          [categoryIndex]: {
            id: {
              $set: response.data.id
            },
            gear_items: {
              0: {
                category_id: {
                  $set: response.data.id
                }
              }
            }
          }
        }
      });
    //set state and then create the new gearItem
    this.setState({
      currentPackList: updatedPackList
    },
    function(){
      this.createGearItem(categoryIndex, 0);
    });
  })
    .catch(error => console.log(error)); 

  }



  editCategoryName(editedCategoryIndex, event){
    //get the index of the edited category and update
    //const editedCategoryIndex = this.state.currentPackList.categories.findIndex(category => category.id === id);
    const updatedPackList = update(this.state.currentPackList, {
      categories: {[editedCategoryIndex]: {name: {$set: event.target.value}}}
    });
    this.setState({
      currentPackList: updatedPackList
    });
  }

  updateCategory(editedCategory){
    //create a copy that does not contain the gear items
    //const editedCategory = this.state.currentPackList.categories.find(category => category.id === id);
    const categoryRequest = {id: editedCategory.id, name: editedCategory.name, weight_in_grams: editedCategory.weight_in_grams, display_metric: editedCategory.display_metric}

    //then send the request
    axios.put(
      `https://backpacking-gear-tracker.herokuapp.com/categories/${categoryRequest.id}`,
      {
        category: categoryRequest
      })
    .then(response => {
    })
    .catch(error => console.log(error)); 
  }

  deleteCategory(categoryIndex){
    var category_weight = this.state.currentPackList.categories[categoryIndex].weight_in_grams
    const category = {id: this.state.currentPackList.categories[categoryIndex].id};
    axios.delete(`https://backpacking-gear-tracker.herokuapp.com/categories/${category.id}`)
    .then(response => {
      const updatedPackList = update(this.state.currentPackList, {
        categories: {
          $splice: [[[categoryIndex], 1]]
        },
        weight_in_grams: {
          $apply: function(x) {return x - category_weight;}
        }
      })
      this.setState({
        currentPackList: updatedPackList
      })
    })
    .catch(error => console.log(error)); 

  }


  ///////gearitems////////
  //add new gear item to interface. Does not save
  newGearItem(categoryIndex){
    //instantiate object with category id
    const categoryID = this.state.currentPackList.categories[categoryIndex].id;
    const newGearItem = {name: "", description: "", weight_in_grams: 0, display_metric: "g", quantity: 1, worn: false, favorite: false, consumable: false, category_id: categoryID}; //do i need to actually assign anything? 
    
    //then update and set state
    const updatedPackList = update(this.state.currentPackList, {
      categories: {[categoryIndex]: {gear_items: {$push: [newGearItem]}}}
    });
    this.setState({
      currentPackList: updatedPackList
    });
  }



  //create gear item on server
  createGearItem(categoryIndex, gearItemIndex){
    //assign gear item and send the request
    const gearItem = this.state.currentPackList.categories[categoryIndex].gear_items[gearItemIndex];
    axios.post(
      `https://backpacking-gear-tracker.herokuapp.com/gear_items/`,
      {
        gear_item: gearItem
      })

    //when successful update state (new id)
    .then(response => {
      const updatedPackList = update(this.state.currentPackList, {
        categories: {[categoryIndex]: {gear_items: {[gearItemIndex] : {$set: response.data}}}}
      });
      this.setState({
        currentPackList: updatedPackList
      })
    })
    .catch(error => console.log(error)); 
  }


  //update the input contents and state of gear item
  editGearItem(categoryIndex, gearItemIndex, event){
    //avlidations
    if(event.target.name === "quantity" && (event.target.value % 1 != 0 || parseFloat(event.target.value) < 0)){
      alert("Invalid: quantity can not be negative or decimal");
      return 
    }
    if(event.target.name === "display_weight" && parseFloat(event.target.value) < 0){
      alert("Invalid: weight can not be negative");
      return
    }


    //want this to be the new one but not working
    if(event.target.name === "display_metric" || event.target.name === "display_weight" || event.target.name === "quantity"){
      const gearItem = this.state.currentPackList.categories[categoryIndex].gear_items[gearItemIndex];
      var oldWeightTotal = gearItem.weight_in_grams * gearItem.quantity;
      var newWeightInGrams, newWeightTotal, diff;

      if(event.target.name === "quantity"){
        newWeightInGrams = gearItem.weight_in_grams; //weight in grams not changing
        newWeightTotal = newWeightInGrams * event.target.value; //get the new total by multiplying the weight in grams by the new quantity
        diff = newWeightTotal - oldWeightTotal; // get the diff between the two totals to adjust category and pack list
      }

      else{
        var weight = event.target.name === "display_weight" ? event.target.value : gearItem.display_weight; //if changing the ewight then use the new one
        var metric = event.target.name === "display_metric" ? event.target.value : gearItem.display_metric; //if changing the metric, then use the new one
        newWeightInGrams =  convert(weight).from(metric).to("g"); //get the new weight in gras
        newWeightTotal = newWeightInGrams * gearItem.quantity; // get the new toat
        diff = newWeightTotal - oldWeightTotal; //and then get the diff to adjust category and pack list
      }

      const updatedPackList = update(this.state.currentPackList, {
        categories: {
          [categoryIndex] : {
            gear_items: {
              [gearItemIndex]: {
                weight_in_grams: {
                  $set: newWeightInGrams
                },
                [event.target.name]: {
                  $set: event.target.value
                }
              }
            },
            weight_in_grams: {
              $apply: function(x) {return parseFloat(x)  + diff}
            }
          }
        
        },
        weight_in_grams: {
          $apply: function(x) {return parseFloat(x) + diff}
        }
      });
      this.setState({
        currentPackList: updatedPackList
      });
    }
    else{
      const updatedPackList = update(this.state.currentPackList, {
        categories: {[categoryIndex]: {gear_items: {[gearItemIndex]: {[event.target.name]: {$set: event.target.value}}}}}
      });
      this.setState({
        currentPackList: updatedPackList
      });
    }
  }


  //update gear item on the server
  updateGearItem(gearItem){
    axios.put(
      `https://backpacking-gear-tracker.herokuapp.com/gear_items/${gearItem.id}`,
      {
        gear_item: gearItem
      })
    .then(response => {
    })
    .catch(error => console.log(error)); 
  }

  deleteGearItem(categoryIndex, gearItemIndex){
    //get the gear item and send the delete request
    const gearItem = this.state.currentPackList.categories[categoryIndex].gear_items[gearItemIndex];
    if(gearItem.id){
      axios.delete(`https://backpacking-gear-tracker.herokuapp.com/gear_items/${gearItem.id}`)
      .then(response => {
          //upon success remove it from state and subtract the value of it from parent accumulations
          const updatedPackList = update(this.state.currentPackList, {
            categories: {
              [categoryIndex]: {
                gear_items: {
                  $splice: [[[gearItemIndex], 1]]
                },

                weight_in_grams: {
                  $apply: function(x) { return x - (gearItem.weight_in_grams *gearItem.quantity);}
                }
              }
            },
            weight_in_grams: {
              $apply: function(x) { return x - (gearItem.weight_in_grams *gearItem.quantity);}
            }
          })
          this.setState({
            currentPackList: updatedPackList
          })
        })
      .catch(error => console.log(error));
    }
    else{
      const updatedPackList = update(this.state.currentPackList, {
        categories: {[categoryIndex]: {gear_items: {$splice: [[[gearItemIndex], 1]]}}}
      });
      this.setState({currentPackList: updatedPackList});
    }
  }



  render() {
    return (

      <div className="App">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 sidebar">
              <Sidebar 
                packLists={this.state.packLists} 
                createPackList={this.createPackList} 
                setCurrentPackList={this.setCurrentPackList} 
                deletePackList={this.deletePackList}
              />
            </div>
            <div className="col offset-3 editor">
              <div className="container"> 
                <Editor 
                  currentPackList={this.state.currentPackList} 
                  editPackList={this.editPackList} 
                  updatePackList={this.updatePackList} 
                  createCategory={this.createCategory} 
                  editCategoryName={this.editCategoryName}
                  updateCategory={this.updateCategory} 
                  deleteCategory={this.deleteCategory} 
                  editGearItem={this.editGearItem} 
                  updateGearItem={this.updateGearItem} 
                  newGearItem={this.newGearItem} 
                  createGearItem={this.createGearItem} 
                  deleteGearItem={this.deleteGearItem}
                />
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
