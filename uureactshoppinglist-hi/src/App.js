import React from "react";


import MembersList from "./components/MembersList";

import Items from "./components/Items";

function App() {
  return(
    <div className="shoppinglist">
      <div className="items">
      <Items/>
      </div>
      <div className="members">
      <MembersList/>
      </div>
      
    </div>
    
  )
}

export default App;