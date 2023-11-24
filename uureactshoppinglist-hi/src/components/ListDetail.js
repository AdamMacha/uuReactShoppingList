import React from 'react';

const ListDetail = ({ listTitle, onBack }) => {
  return (
    <div>
      <h3>Detail nákupního seznamu: {listTitle}</h3>
      {/* Zde můžete zobrazit další detaily o seznamu */}
      <button onClick={onBack}>Zpět</button>
    </div>
  );
};

export default ListDetail;