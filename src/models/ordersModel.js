import { cancelOrderAPI, deliveryStatusAPI, getOrderByIDAPI, getOrdersListAPI, exportOrderAPI, updatestepAPI } from '../services/ordersService';

export default {
  namespace: 'orders',
  state: {
    singleOrder: {},
    order_list: [],

  },
  effects: {
    *setState({ payload }, { put }) {
      yield put({
        type: 'save',
        payload,
      });
    },

    *getOrdersList({ payload }, { call, put }) {
      try {
        const response = yield call(getOrdersListAPI, payload);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              order_list: response.data || [],
            },
          });
        } else {
          yield put({
            type: 'save',
            payload: {
              order_list: [],
            },
          });
        }
      } catch (error) {
        console.error('error in orders list api', error);
      }
    },

    *getOrderByID({ payload }, { call, put }) {
      try {
        const response = yield call(getOrderByIDAPI, payload);
        if (response) {
          yield put({
            type: 'save',
            payload: {
              singleOrder: response.data || {},
            },
          });
        }
      } catch (error) {
        console.error('error in orders single api', error);
      }
    },
    *cancelOrder({ payload }, { call, put }) {
      try {
        const response = yield call(cancelOrderAPI, payload);
        if (response) {
          yield put({
            type: 'save',
            payload: {
              cancelOrder: true,
            },
          });
        }
        return response;
      } catch (error) {
        console.error('error in orders cancel api', error);
        return {
          success: false,
          msg: 'Order is already cancelled',
        };
      }
    },
    *deliveryStatus({ payload }, { call, put }) {
      try {
        const response = yield call(deliveryStatusAPI, payload);
        if (response) {
          yield put({
            type: 'save',
            payload: {
              deliveryStatus: true,
            },
          });
        }
        return response;
      } catch (error) {
        console.error('error in orders delivery status api', error);
      }
    },
    *exportOrder({ payload }, { call, put }) {
      try {
        const response = yield call(exportOrderAPI, payload);
        if (response) {
          yield put({
            type: 'save',
            payload: {
              export: true,
            },
          });
        }
        return response;
      } catch (error) {
        console.error('error in orders export api', error);
      }
    },

    *updatestep({ payload }, { call, put }) {
      try {
        const response = yield call(updatestepAPI, payload);
        if (response) {
          yield put({
            type: 'save',
            payload: {
              updatestep: true,
            },
          });
        }
        return response;
      } catch (error) {
        console.error('error in orders chatbot/updatestep api', error);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        singleOrder: {},
        order_list: [],
      };
    },
  },
};
