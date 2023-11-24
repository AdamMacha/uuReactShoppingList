// ListDetailPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Items from './Items';
import MembersList from './MembersList';
import "./ListDetailPage.css";

const ListDetailPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const listTitle = queryParams.get('title');

  return (
    <div className="shoppinglist">
      <div className="items">
      <Items title={listTitle}/>
      </div>
      <div className="members">
      <MembersList/>
      </div>
      
    </div>
  );
};

export default ListDetailPage;
