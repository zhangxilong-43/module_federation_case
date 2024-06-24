import { Route, Switch, useNavigate } from 'react-router-dom';
import React, { lazy, Suspense }  from 'react';
import MiniApp from './miniApp.jsx';
import Page from './Page.jsx';

// const Page = lazy(() => import('app_2/Page'))

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <MiniApp />,
  },{
    path: "/Page",
    // element: <Suspense fallback={<div>Loading...</div>}>
    //   <Page />
    // </Suspense>,
    element: <Page />,
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
