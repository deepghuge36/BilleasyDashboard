import { getCustomerBillAPI, getCustomerListAPI, getCustomerListV2API, getCustomerCountAPI} from '../services/customerService';

const CustomerModel = {
  namespace: 'customerModel',
  state: {},
  effects: {
    *getCustomerList({ payload }, { call, put }) {
      try {
        const response = yield call(getCustomerListAPI, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: response.data,
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },

   // customer page api integration testing
   
    *getCustomerListV2({ payload }, { call, put }) {
      try {
        const response = yield call(getCustomerListV2API, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {customers:response.data},
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },
    *getCustomerCount({ payload }, { call, put }) {
      try {
        const response = yield call(getCustomerCountAPI, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {meta:response.data},
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },



    *getCustomerBill({ payload }, { call, put }) {
      try {
        const response = yield call(getCustomerBillAPI, payload);
        console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              customerBill: response.data
            },
          });
          return response.data || [];
        }
      } catch (error) {
        console.error('error in customer bill api', error);
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
      return {};
    },
  },
};
export default CustomerModel;
