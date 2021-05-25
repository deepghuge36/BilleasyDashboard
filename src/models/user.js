import { verifyAuthAPI, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *verifyAuth({ payload }, { call, put }) {
      const response = yield call(verifyAuthAPI, payload);
      // console.log('response of verify auth', response);
      if (response.success) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
        return response.data.user_client_id;
      }
      return '';
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
