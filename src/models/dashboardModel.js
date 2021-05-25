import { fetchDashboard } from '../services/dashboardService';

export default {
  namespace: 'dashboardModel',

  state: {
    glanceData: {},
    isDark: false,
  },

  effects: {
    *fetch(_, { call, put }) {
      // const response = yield call(fetchDashboard);
      // console.log(response);
      // if (response) {
      //   yield put({
      //     type: 'save',
      //     payload: response,
      //   });
      // }

      try {
        const response = yield call(fetchDashboard);
        if (response.success) {
          yield put({
            type: 'save',
            payload: {
              glanceData: response.data || {},
            },
          });
        }
      } catch (error) {
        console.error('error in api', error);
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
    saveBills(state, { payload }) {
      return {
        ...state,
        bills: payload,
      };
    },
    clear() {
      return {
        glanceData: {},
        isDark: false,
      };
    },
  },
};
