
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Routers from './Components/Routers.jsx';
import './style/App.less';

export default () => {
  // const [pathname, setPathname] = useState('/container');
  // const navigate = useNavigate();

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Routers/>
    </div>
  );
};