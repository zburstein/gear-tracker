import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';


const PacksNav = ({packs, onAddPackClick}) => {
  return (
    <div>
      <h2 className="inline-title">Packs</h2>
      <button className="add-button add-pack" onClick={() => onAddPackClick()}>
        <FontAwesome name='plus' size="1x" className="button-icon"/>
        Add new list
      </button>
      <div className="card text-white bg-secondary packs-nav-card">
        <div className="card-body">
          <ul className="packs-nav-list">
            {packs.map((pack, index) => (
              <div className="pack-row" key={index}>
                <li className="pack-nav-link">
                  {pack}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

}

export default PacksNav;