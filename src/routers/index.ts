import React, { lazy } from 'react'
import Account from '../pages/account'

import Home from '../pages/home'
import MainLayout from 'pages/_layout/MainLayout'
import Page404 from '../pages/404'
import { RouterParam } from 'core'
import AccountLayout from 'pages/account/_layout'

export const routers: RouterParam[] = [
    {
        component: MainLayout,
        routers: [
            {
                path: '/',
                component: Home,
                exact: true
            },
            {
                path: '/account',
                component: AccountLayout,
                routers: [
                    {
                        path: '/info',
                        component: lazy(() => import('../pages/account/accountInfo')),
                        exact: true,
                    },
                    {
                        path: '/orders',
                        component: lazy(() => import('../pages/account/accountOrders')),
                        exact: true,
                    },
                    {
                        path: '/wishlist',
                        component: lazy(() => import('../pages/account/wishList'))
                    },
                ]
            },
            {
                component: Page404
            }
        ]
    }
]


