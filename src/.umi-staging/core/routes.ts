// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@/components/PageLoading/index';

export function getRoutes() {
  const routes = [
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BlankLayout' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/layouts/BlankLayout'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__UserLayout' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/layouts/UserLayout'), loading: LoadingComponent}),
        "routes": [
          {
            "path": "/user/login",
            "name": "Login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__User__login' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          },
          {
            "name": "register-result",
            "icon": "smile",
            "path": "/user/register-result",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register-result' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/user/register-result'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "name": "register",
            "icon": "smile",
            "path": "/user/register",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__register' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/user/register'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      },
      {
        "path": "/",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts__BasicLayout' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/layouts/BasicLayout'), loading: LoadingComponent}),
        "Routes": [
          "src/pages/Authorized"
        ],
        "authority": [
          "admin",
          "user"
        ],
        "routes": [
          {
            "path": "/dashboard",
            "name": "home",
            "icon": "home",
            "routes": [
              {
                "path": "/",
                "redirect": "/dashboard/analysis",
                "exact": true
              },
              {
                "name": "Activity View",
                "icon": "smile",
                "path": "/dashboard/analysis",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__analysis' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/analysis'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Updates",
                "icon": "smile",
                "path": "/dashboard/monitor",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__monitor' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Top Widgets",
                "icon": "smile",
                "path": "/dashboard/workplace",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__dashboard__workplace' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/workplace'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/form",
            "icon": "form",
            "name": "Analysis",
            "routes": [
              {
                "path": "/",
                "redirect": "/form/basic-form",
                "exact": true
              },
              {
                "name": "Campaigns & Analysis",
                "icon": "smile",
                "path": "/form/basic-form",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__form__basic-form' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/basic-form'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Customer Profiling",
                "icon": "smile",
                "path": "/form/step-form",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__form__step-form' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/step-form'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Product Profiling",
                "icon": "smile",
                "path": "/form/advanced-form",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__form__advanced-form' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/advanced-form'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Territory Profiling",
                "icon": "smile",
                "path": "/form/territory-profile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__form__territory-profile' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/territory-profile'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Sale Profiling",
                "icon": "smile",
                "path": "/form/sale-profile",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__form__sale-profile' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/sale-profile'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/list",
            "icon": "table",
            "name": "Inventory",
            "routes": [
              {
                "name": "Data",
                "icon": "smile",
                "path": "/list/basic-list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__list__basic-list' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/basic-list'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Metrics",
                "icon": "smile",
                "path": "/list/card-list",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__list__card-list' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/card-list'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/customer",
            "name": "Customers",
            "icon": "profile",
            "routes": [
              {
                "path": "/",
                "redirect": "/customer/data",
                "exact": true
              },
              {
                "name": "Data",
                "icon": "smile",
                "path": "/customer/data",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer__data' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/customer/data'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Matrics",
                "icon": "smile",
                "path": "/customer/matrics",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__customer__matrics' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/customer/matrics'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "path": "/orders",
            "name": "Orders",
            "icon": "profile",
            "routes": [
              {
                "path": "/orders",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__orders' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/orders'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "Bills",
            "icon": "CheckCircleOutlined",
            "path": "/bills",
            "routes": [
              {
                "path": "/",
                "redirect": "/bills/data",
                "exact": true
              },
              {
                "name": "Data",
                "icon": "smile",
                "path": "/bills/data",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__bills__data' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/bills/data'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Metrics",
                "icon": "smile",
                "path": "/result/fail",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__result__fail' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/fail'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "Promotions",
            "icon": "warning",
            "path": "/exception",
            "routes": [
              {
                "path": "/",
                "redirect": "/exception/403",
                "exact": true
              },
              {
                "name": "Campaigns",
                "icon": "smile",
                "path": "/exception/403",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__403' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/403'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Feedbacks",
                "icon": "smile",
                "path": "/exception/404",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__404' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/404'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "WhatsApp Support",
                "icon": "smile",
                "path": "/exception/500",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__500' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Digital Loyalty Card",
                "icon": "smile",
                "path": "/exception/digitalLoyalty",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__digitalLoyalty' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/digitalLoyalty'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "Stores",
            "icon": "user",
            "path": "/account",
            "routes": [
              {
                "path": "/",
                "redirect": "/account/center",
                "exact": true
              },
              {
                "name": "Data",
                "icon": "smile",
                "path": "/account/center",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__account__center' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/center'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Micro eComm",
                "icon": "smile",
                "path": "/account/settings",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__account__settings' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings'), loading: LoadingComponent}),
                "exact": true
              },
              {
                "name": "Offline Plugin",
                "icon": "smile",
                "path": "/account/offlinePlugin",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__account__offlinePlugin' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/offlinePlugin'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "name": "Settings",
            "icon": "highlight",
            "path": "/editor",
            "routes": [
              {
                "path": "/editor",
                "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__editor' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor'), loading: LoadingComponent}),
                "exact": true
              }
            ]
          },
          {
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/404'), loading: LoadingComponent}),
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
