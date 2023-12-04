import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Items from './Items';
import MembersList from './MembersList';
import "./css/ListDetailPage.css";

const ListDetailPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const listTitle = queryParams.get('title');

    const { id } = useParams();

    const items = []

  return (
    <div className="shoppinglists">
      <div className="items">
      <Items title={listTitle} items={items} id={id}/>
      </div>
      <div className="members">
      <MembersList/>
      </div>
      
    </div>
  );
};

export default ListDetailPage;
