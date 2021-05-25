// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'en-US',
    // default: true,
    antd: true,

    // when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      component: '../layouts/BlankLayout',
      routes: [
        { path: '/', redirect: '/user/login' },
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'Login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            // {
            //   path: '/',
            //   redirect: '/dashboard/analysis',
            // },
            {
              path: '/dashboard',
              name: 'home',
              icon: 'home',
              // customIcon: 'home',
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  name: 'Activity View',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
                {
                  name: 'Updates',
                  icon: 'smile',
                  path: '/dashboard/monitor',
                  component: './dashboard/monitor',
                },
                {
                  name: 'Top Widgets',
                  icon: 'smile',
                  path: '/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/form',
              icon: 'form',
              name: 'Analysis',
              routes: [
                {
                  path: '/',
                  redirect: '/form/basic-form',
                },
                {
                  name: 'Campaigns & Analysis',
                  icon: 'smile',
                  path: '/form/basic-form',
                  component: './form/basic-form',
                },
                {
                  name: 'Customer Profiling',
                  icon: 'smile',
                  path: '/form/step-form',
                  component: './form/step-form',
                },
                {
                  name: 'Product Profiling',
                  icon: 'smile',
                  path: '/form/advanced-form',
                  component: './form/advanced-form',
                },
                {
                  name: 'Territory Profiling',
                  icon: 'smile',
                  path: '/form/territory-profile',
                  component: './form/territory-profile',
                },
                {
                  name: 'Sale Profiling',
                  icon: 'smile',
                  path: '/form/sale-profile',
                  component: './form/sale-profile',
                },
              ],
            },
            {
              path: '/list',
              icon: 'table',
              name: 'Inventory',
              routes: [
                // {
                //   path: '/list/search',
                //   name: 'search-list',
                //   component: './list/search',
                //   routes: [
                //     {
                //       path: '/list/search',
                //       redirect: '/list/search/articles',
                //     },
                //     {
                //       name: 'articles',
                //       icon: 'smile',
                //       path: '/list/search/articles',
                //       component: './list/search/articles',
                //     },
                //     {
                //       name: 'projects',
                //       icon: 'smile',
                //       path: '/list/search/projects',
                //       component: './list/search/projects',
                //     },
                //     {
                //       name: 'applications',
                //       icon: 'smile',
                //       path: '/list/search/applications',
                //       component: './list/search/applications',
                //     },
                //   ],
                // },
                // {
                //   path: '/',
                //   redirect: '/list/table-list',
                // },
                // {
                //   name: 'table-list',
                //   icon: 'smile',
                //   path: '/list/table-list',
                //   component: './list/table-list',
                // },
                {
                  name: 'Data',
                  icon: 'smile',
                  path: '/list/basic-list',
                  component: './list/basic-list',
                },
                {
                  name: 'Metrics',
                  icon: 'smile',
                  path: '/list/card-list',
                  component: './list/card-list',
                },
              ],
            },
            {
              path: '/profile',
              name: 'Customers',
              icon: 'profile',
              routes: [
                {
                  path: '/',
                  redirect: '/profile/basic',
                },
                {
                  name: 'Data',
                  icon: 'smile',
                  path: '/profile/basic',
                  component: './profile/basic',
                },
                {
                  name: 'Matrics',
                  icon: 'smile',
                  path: '/profile/advanced',
                  component: './profile/advanced',
                },
              ],
            },
            {
              path: '/orders',
              name: 'Orders',
              icon: 'profile',
              routes: [
                {
                  path: '/orders',
                  component: './orders',
                },
              ],
            },
            {
              name: 'Bills',
              icon: 'CheckCircleOutlined',
              path: '/bills',
              routes: [
                {
                  path: '/',
                  redirect: '/bills/data',
                },
                {
                  name: 'Data',
                  icon: 'smile',
                  path: '/bills/data',
                  component: './bills/data',
                },
                {
                  name: 'Metrics',
                  icon: 'smile',
                  path: '/result/fail',
                  component: './result/fail',
                },
              ],
            },
            {
              name: 'Promotions',
              icon: 'warning',
              path: '/exception',
              routes: [
                {
                  path: '/',
                  redirect: '/exception/403',
                },
                {
                  name: 'Campaigns',
                  icon: 'smile',
                  path: '/exception/403',
                  component: './exception/403',
                },
                {
                  name: 'Feedbacks',
                  icon: 'smile',
                  path: '/exception/404',
                  component: './exception/404',
                },
                {
                  name: 'WhatsApp Support',
                  icon: 'smile',
                  path: '/exception/500',
                  component: './exception/500',
                },
                {
                  name: 'Digital Loyalty Card',
                  icon: 'smile',
                  path: '/exception/digitalLoyalty',
                  component: './exception/digitalLoyalty',
                },
              ],
            },
            {
              name: 'Stores',
              icon: 'user',
              path: '/account',
              routes: [
                {
                  path: '/',
                  redirect: '/account/center',
                },
                {
                  name: 'Data',
                  icon: 'smile',
                  path: '/account/center',
                  component: './account/center',
                },
                {
                  name: 'Micro eComm',
                  icon: 'smile',
                  path: '/account/settings',
                  component: './account/settings',
                },
                {
                  name: 'Offline Plugin',
                  icon: 'smile',
                  path: '/account/offlinePlugin',
                  component: './account/offlinePlugin',
                },
              ],
            },
            {
              name: 'Settings',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  path: '/editor',
                  // redirect: '/editor/flow',
                  component: './editor',
                },
                // {
                //   name: 'flow',
                //   icon: 'smile',
                //   path: '/editor/flow',
                //   component: './editor/flow',
                // },
                // {
                //   name: 'mind',
                //   icon: 'smile',
                //   path: '/editor/mind',
                //   component: './editor/mind',
                // },
                // {
                //   name: 'koni',
                //   icon: 'smile',
                //   path: '/editor/koni',
                //   component: './editor/koni',
                // },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
