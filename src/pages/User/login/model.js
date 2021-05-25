import { history } from 'umi';
import { message } from 'antd';
import { parse } from 'qs';
import Cookies from 'js-cookie';
import { clientLogin, getFakeCaptcha } from './service';

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
  // reload Authorized component

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}
const Model = {
  namespace: 'userAndlogin',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(clientLogin, payload);
      if (response.success) {
        yield put({
          type: 'save',
          payload: response.data,
        }); // Login successfully
        message.success('login successful');
        Cookies.set('BAUT', response.data.authentication_token);
        Cookies.set('BEmail', response.data.email);
        Cookies.set('StoreId', 'all');
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        history.replace(redirect || '/dashboard/analysis');
      } else {
        yield put({
          type: 'save',
          payload: {
            status: 'Inavlid email or password',
          },
        }); // Login failed
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      // setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return { status: undefined };
    },
  },
};
export default Model;
