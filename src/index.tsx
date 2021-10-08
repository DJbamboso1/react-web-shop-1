import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, routerConfig } from './core';
import {reducers} from './store'
import {routers} from './routers'
import en from './locale/en/index.json'
import vn from './locale/vn/index.json'
import {CartModal} from './components/CartModal'
import saga from 'store/saga';


ReactDOM.render(
  <React.StrictMode>
    <AppProvider reducers={reducers} translate={{ en, vn }} language="en" saga={saga}>
        
      <Suspense fallback={<div>Loading....</div>}>
        {routerConfig(routers)}
        <CartModal/>
      </Suspense>
      
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log(document.querySelector('#modalShoppingCart'))

