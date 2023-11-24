import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Items from './Items';
import MembersList from './MembersList';
import "./ListDetailPage.css";

const demoItems = {
  0: [
    {
      id: 0,
      name: 'Banány',
      pcs: '2',
    },
    {
      id: 1,
      name: 'Jablka',
      pcs: '3',
    },
  ],
  1: [
    {
      id: 0,
      name: 'Hovězí maso',
      pcs: '1',
    },
    {
      id: 1,
      name: 'Papriky',
      pcs: '5',
    },
  ],
};



const ListDetailPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const listTitle = queryParams.get('title');

    const { id } = useParams();

    const itemsForList = demoItems[id] || [];

  return (
    <div className="shoppinglists">
      <div className="items">
      <Items title={listTitle} items={itemsForList}/>
      </div>
      <div className="members">
      <MembersList/>
      </div>
      
    </div>
  );
};

export default ListDetailPage;
