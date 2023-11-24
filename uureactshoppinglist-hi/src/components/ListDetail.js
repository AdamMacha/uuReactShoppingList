import React from 'react';
import "./ListDetail.css"

const ListDetail = ({ listTitle, onBack }) => {
  return (
    <div className="list-detail">
      <h3>Detail nákupního seznamu: {listTitle}</h3>
      <button onClick={onBack}>Zpět</button>
    </div>
  );
};

export default ListDetail;