import React, { lazy } from 'react'
import Account from '../pages/account'
import Home from '../pages/home'
import MainLayout from 'pages/_layout/MainLayout'
import Page404 from '../pages/404'
import { RouterParam } from 'core'
import AccountLayout from 'pages/account/_layout'
import AuthLayout from 'pages/_layout/AuthLayout'
import ProductPage from 'pages/product'



export const routers: RouterParam[] = [
    {
        path: '/',
        component: lazy(() => import('../pages/authenicate/login')),
        // auth: false,
        exact: true,
    },
    {
        path: '/register',
        component: lazy(() => import('../pages/authenicate/register')),
        // auth: false,
        exact: true,
    },
    {
        auth: 'Distributor',
        path: '/home',
        component: Home,
        exact: true
    },
    {
        path: '/404',
        component: Page404
    },
    {
        component: MainLayout,
        auth: 'Retailer',
        routers: [
            {
                path: '/product',
                component: ProductPage,
                // auth: 'Retailer',
                exact: true
            },
            {
                path: '/account',
                component: AccountLayout,
                // auth: 'Retailer',
                routers: [
                    {
                        path: '/info',
                        component: lazy(() => import('../pages/account/accountInfo')),
                        exact: true,
                    },
                    {
                        path: '/orders/:slug',
                        component: lazy(() => import('../pages/account/accountOrders')),
                        exact: true,
                    },
                    {
                        path: '/orderDetail/:slug',
                        component: lazy(() => import('../pages/account/accountOrderDetail')),
                        exact: true,
                    },
                    {
                        path: '/wishlist',
                        component: lazy(() => import('../pages/account/wishList'))
                    },
                    {
                        path: '/session',
                        component: lazy(() => import('../pages/account/accountSession'))
                    },

                ]
            },           
            {
                path: '/view-cart',
                component: lazy(() => import('../pages/view_cart')),
                exact: true,
                // auth: 'Retailer'
            },
            {
                path: '/checkout',
                component: lazy(() => import('../pages/checkout')),
                exact: true,
                // auth: 'Retailer'
            },
            {
                path: '/order-complete',
                component: lazy(() => import('../pages/checkoutComplete')),
                // auth: 'Retailer',
                exact: true
            },
            {
                path: '/order-complete/:slug',
                component: lazy(() => import('../pages/checkoutComplete')),
                // auth: 'Retailer',
                exact: true
            },
            {
                // auth: 'Retailer',
                path: '/product/:slug',
                component: lazy(() => import('../pages/productDetail')),
                exact: true
            },
            {
                component: Page404
            }
        ]
    },
    
]


