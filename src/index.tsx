import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, routerConfig } from './core';
import {reducers} from './store'
import {routers} from './routers'
import en from './locale/en/index.json'
import vn from './locale/vn/index.json'
import {CartModal} from './components/CartModal'
import saga from 'store/saga';
import { SearchModal } from 'components';

let $header = document.querySelector('#header')

    window.addEventListener('scroll', function () {
        let scrollTop = document.documentElement.scrollTop
        if ($header) {
            let height = $header?.scrollHeight || 0
            if (scrollTop > height) {
                $header.classList.add('fixed')
            } else {
                $header.classList.remove('fixed')
            }
        }
    })
ReactDOM.render(
  <React.StrictMode>
    <AppProvider reducers={reducers} translate={{ en, vn }} language="en" saga={saga}>
        
      <Suspense fallback={<div>Loading....</div>}>
        {routerConfig(routers)}
        <CartModal/>
        <SearchModal/>
      </Suspense>
      
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



