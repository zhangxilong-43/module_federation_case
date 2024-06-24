import React, { Suspense } from 'react';

// https://github.com/module-federation/core/issues/2558
// const MyPage = lazy(() => loadRemote('app_2/Page'))
debugger
const MyPage = React.lazy(() => import('app_2/Page'));

const App = () => (
  <>
    <Suspense>
      <MyPage />
    </Suspense>
  </>
);

export default App;