/* eslint-disable no-nested-ternary */
// import request from '@/utils/request';
import { apiAccess, apiSecret, migrateURL } from '@/utils/env';
import request from 'umi-request';
import Cookies from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};

// const storeId = parseInt(Cookies.get('StoreId'), 10);

// const storeParams = typeof storeId !== 'undefined' && storeId !== null
//   ? storeId !== 'all'
//     ? `&store_id=${storeId}`
//     : ''
//   : '';

export async function getCustomerListAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? pageStoreID == 'all' ? undefined : pageStoreID : storeIDMain,
  };
  return request(`${migrateURL}/clients/customerList`, {
    headers,
    method: 'POST',
    data: payload,
  });
}

export async function getCustomerListV2API(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? pageStoreID == 'all' ? undefined : pageStoreID : storeIDMain,
  };
  return request(`${migrateURL}/clients/customerList_v2`, {
    headers,
    method: 'POST',
    data: payload,
  });
}
export async function getCustomerCountAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/clients/Customerbillcount`, {
    headers,
    method: 'POST',
  });
}

export async function getCustomerBillAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/clients/billsbycustomer?customer_id=${params}`, {
    headers,
    method: 'GET',
    // data: params,
  });
}
