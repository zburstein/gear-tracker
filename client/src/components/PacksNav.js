import React from 'react';
import FontAwesome from 'react-fontawesome';


const PacksNav = ({packs, onAddPackClick, onPackSelect, onPackDelete}) => {
  return (
    <div>
      <h2 className="inline-title">Packs</h2>
      <button className="add-button add-pack" onClick={() => onAddPackClick()}>
        <FontAwesome name='plus' size="lg" className="button-icon"/>
        Add new list
      </button>
      <div className="card text-white bg-secondary packs-nav-card">
        <div className="card-body">
          <ul className="packs-nav-list">
            {packs.map((pack, index) => (
              <div className="pack-row" key={index}>
                <li className="pack-nav-link" onClick={() => onPackSelect(pack.id)}>
                  {pack.name}
                </li>
                <FontAwesome name='times-circle' className="delete pack-delete" size="lg" onClick={() => { if (window.confirm('Are you sure you want to delete packList?')) onPackDelete(pack.id) }}/>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

}

export default PacksNav;