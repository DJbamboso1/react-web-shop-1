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
        component: MainLayout,
        routers: [
            {
                path: '/',
                component: ProductPage,
                auth: false,
                exact: true
            },
            {
                path: '/auth',
                component: AuthLayout,
                auth: false,
                routers: [
                    {
                        path: '/login',
                        component: lazy(() => import('../pages/authenicate/login')),
                        exact: true,
                    },
                    {
                        path: '/register',
                        component: lazy(() => import('../pages/authenicate/register')),
                        exact: true,
                    },
                ]
            },
            {
                path: '/account',
                component: AccountLayout,
                auth: true,
                routers: [
                    {
                        path: '/info',
                        component: lazy(() => import('../pages/account/accountInfo')),
                        exact: true,
                    },
                    {
                        // path: '/orders',
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
            // {
            //     path: '/product',
            //     component: ProductPage,
            //     auth: false,
            //     exact: true
            // },
            {
                path: '/view-cart',
                component: lazy(() => import('../pages/view_cart')),
                exact: true
            },
            {           
                path: '/checkout',
                component: lazy(() => import('../pages/checkout')), 
                exact: true
            },
            {
                path: '/order-complete',
                component: lazy(() => import('../pages/checkoutComplete')),
                auth: true,
                exact: true
            },
            {
                path: '/order-complete/:slug',
                component: lazy(() => import('../pages/checkoutComplete')),
                auth: true,
                exact: true
            },
            {
                path: '/product/:slug',
                component: lazy(() => import('../pages/productDetail')),
                exact: true
            },
            {
                component: Page404
            }
        ]
    }
    
]


