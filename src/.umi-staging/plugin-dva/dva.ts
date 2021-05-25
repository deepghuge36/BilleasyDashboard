// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelBillsModal0 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/billsModal.js';
import ModelCustomerModal1 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/customerModal.js';
import ModelDashboardModel2 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/dashboardModel.js';
import ModelGlobal3 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/global.js';
import ModelInventoryModel4 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/inventoryModel.js';
import ModelLogin5 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/login.js';
import ModelOrdersModel6 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/ordersModel.js';
import ModelSetting7 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/setting.js';
import ModelStoreModal8 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/storeModal.js';
import ModelUser9 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/models/user.js';
import ModelModel10 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/center/model.js';
import ModelModel11 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings/model.js';
import ModelModel12 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/analysis/model.js';
import ModelModel13 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/model.js';
import ModelModel14 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/workplace/model.js';
import ModelModel15 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/advanced-form/model.js';
import ModelModel16 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/basic-form/model.js';
import ModelModel17 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/step-form/model.js';
import ModelModel18 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/basic-list/model.js';
import ModelModel19 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/card-list/model.js';
import ModelModel20 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/search/applications/model.js';
import ModelModel21 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/search/articles/model.js';
import ModelModel22 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/list/search/projects/model.js';
import ModelModel23 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/profile/advanced/model.js';
import ModelModel24 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/profile/basic/model.js';
import ModelModel25 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/login/model.js';
import ModelModel26 from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register/model.js';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'billsModal', ...ModelBillsModal0 });
app.model({ namespace: 'customerModal', ...ModelCustomerModal1 });
app.model({ namespace: 'dashboardModel', ...ModelDashboardModel2 });
app.model({ namespace: 'global', ...ModelGlobal3 });
app.model({ namespace: 'inventoryModel', ...ModelInventoryModel4 });
app.model({ namespace: 'login', ...ModelLogin5 });
app.model({ namespace: 'ordersModel', ...ModelOrdersModel6 });
app.model({ namespace: 'setting', ...ModelSetting7 });
app.model({ namespace: 'storeModal', ...ModelStoreModal8 });
app.model({ namespace: 'user', ...ModelUser9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
app.model({ namespace: 'model', ...ModelModel13 });
app.model({ namespace: 'model', ...ModelModel14 });
app.model({ namespace: 'model', ...ModelModel15 });
app.model({ namespace: 'model', ...ModelModel16 });
app.model({ namespace: 'model', ...ModelModel17 });
app.model({ namespace: 'model', ...ModelModel18 });
app.model({ namespace: 'model', ...ModelModel19 });
app.model({ namespace: 'model', ...ModelModel20 });
app.model({ namespace: 'model', ...ModelModel21 });
app.model({ namespace: 'model', ...ModelModel22 });
app.model({ namespace: 'model', ...ModelModel23 });
app.model({ namespace: 'model', ...ModelModel24 });
app.model({ namespace: 'model', ...ModelModel25 });
app.model({ namespace: 'model', ...ModelModel26 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
