import {
  deleteBillByIDAPI,
  exportBillCSVAPI,
  getBillsAPI,
  getBillsByIDAPI,
  getPurchaseOrderAPI,
  BillsMetrixAPI,
  ExportBillAPI,
  getBillsAPIv2,
  getBillsPagesCountAPI,
  min_max_amount_v2API,
  aggClientBills_v2API,
} from '@/services/billsService';

const billsModel = {
  namespace: 'billsModel',
  state: {},
  effects: {
    *getBills({ payload }, { call, put }) {
      try {
        const response = yield call(getBillsAPI, payload);
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
    //testing
    *getBillsv2({ payload }, { call, put }) {
      try {
        const response = yield call(getBillsAPIv2, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: { bills: response.data },
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },
    *getBillsPagesCount({ payload }, { call, put }) {
      try {
        const response = yield call(getBillsPagesCountAPI, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: { meta: response.data },
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },
    *getMin_Max_Amount_v2({ payload }, { call, put }) {
      try {
        const response = yield call(min_max_amount_v2API, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: { min_max: response.data },
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },
    *getAggClientBills_v2({ payload }, { call, put }) {
      try {
        const response = yield call(aggClientBills_v2API, payload);
        // console.log('response of customer', response);
        if (response.success) {
          yield put({
            type: 'save',
            payload: { aggrClientBill: response.data },
          });
        }
      } catch (error) {
        console.error('error in customer api', error);
      }
    },
    *getBillsByID({ payload }, { call }) {
      try {
        const response = yield call(getBillsByIDAPI, payload);
        if (response.success) {
          return response.data || {};
        }
      } catch (error) {
        console.error('error in getBillsByID api', error);
      }
      return {};
    },
    *deleteBillByID({ payload }, { call }) {
      try {
        const response = yield call(deleteBillByIDAPI, payload);
        if (response.success) {
          return response.data || {};
        }
      } catch (error) {
        console.error('error in deleteBillByID api', error);
      }
      return {};
    },
    *exportBillCSV({ payload }, { call }) {
      try {
        const response = yield call(exportBillCSVAPI, payload);
        if (response) {
          return response;
        }
      } catch (error) {
        console.error('error in export bill csv', error);
      }
      return false;
    },
    *getPurchaseOrder({ payload }, { call }) {
      try {
        const response = yield call(getPurchaseOrderAPI, payload);
        if (response) {
          return response;
        }
      } catch (error) {
        console.error('error in expor po', error);
      }
      return false;
    },
    *BillsMetrix({ payload }, { call }) {
      try {
        const response = yield call(BillsMetrixAPI, payload);
        if (response) {
          // console.log(response);
          // console.log(payload);
          return response;
        }
      } catch (error) {
        console.error('error in expor bills metrix', error);
      }
      return false;
    },
    //newly written for bill export
    *ExportBill({ payload }, { call }) {
      try {
        const response = yield call(ExportBillAPI, payload);
        if (response) {
          console.log(response, 'exportbill response');
          // console.log(payload);
          return response;
        }
      } catch (error) {
        console.error('Empty Export Bill', error);
      }
      return false;
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
      return {};
    },
  },
};
export default billsModel;
