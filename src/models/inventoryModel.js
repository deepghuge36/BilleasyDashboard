import { getInventoryListAPI } from "@/services/inventoryService";

const InventoryModel = {
  namespace: 'inventoryModel',
  state: {
    tab:'0',
  },
  effects: {
    *getInventoryList({ payload }, { call, put }) {
      try {
        const response = yield call(getInventoryListAPI, payload);
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
        tab: '0',
      };
    },
  },
};
export default InventoryModel;
