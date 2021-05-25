import { deviceMappingListAPI, getStoreListAPI,devicesbystoreAPI, storeAnalyticsAPI } from "@/services/storeService";
import Cookies from 'js-cookie'

const storeModel = {
  namespace: 'storeModel',
  state: {
    activeStore: 'all',
    devices: {
      data: [],
      meta: {},
    },
    terminalData:{},
    storeAnalytics:[],
  },
  effects: {
    *setState({ payload }, { put }) {
      if (payload) {
        yield put({
          type: 'save',
          payload,
        });
        Cookies.set('StoreId', payload.activeStore);
      }
    },
    *getStoreList({ payload }, { call, put }) {
      try {
        const response = yield call(getStoreListAPI, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: response.data,
          });
        }
      } catch (error) {
        console.error('error in store api', error);
      }
    },
    *deviceMappingList({ payload }, { call, put }) {
      try {
        const response = yield call(deviceMappingListAPI, payload);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              devices: {
                data: response.data.stores || [],
                meta: response.data.meta || {},
              },
            },
          });
        }
      } catch (error) {
        console.error('error in store api', error);
      }
    },
    *devicesbystore({ payload }, { call, put }) {
      try {
        const response = yield call(devicesbystoreAPI, payload);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              terminalData: response.data || {},
            },
          });
        }
      } catch (error) {
        console.error('error in terminal api', error);
      }
    },
    *storeAnalytics({ payload }, { call, put }) {
      try {
        const response = yield call(storeAnalyticsAPI, payload);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              storeAnalytics: response.data || {},
            },
          });
        }
      } catch (error) {
        console.error('error in terminal api', error);
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    clear() {
      return {
        devices: {
          data: [],
          meta: {},
        },
        terminalData: {},
        storeAnalytics:[],
      };
    },
  },
};
export default storeModel;
