import React, { Suspense } from 'react';
// import runtimePlugin from '../custom-runtime-plugin'
import { init, loadRemote } from '@module-federation/enhanced/runtime';

// import MyPage from 'app_2/Page';


// https://github.com/module-federation/core/issues/2558
// const MyPage = lazy(() => loadRemote('app_2/Page'))
// debugger
init({
  name: 'app_1',
  remotes: [
    {
      name: 'app_2',
      entry: 'http://127.0.0.1:3002/remoteEntry.js',
      alias: 'app_2',
    },
  ],
  // plugins: [runtimePlugin()],
});

loadRemote("app_2/Page")
// .then((Page)=>{
//   console.log(Page, 'Page');
// });
// const MyPage = React.lazy(() => import('app_2/Page'));
// const MyPage = React.lazy(() => loadRemote('app_2/Page'));

const App = () => (
  <>
    <Suspense>
      {/* <MyPage /> */}
    </Suspense>
  </>
);

export default App;