/* eslint-disable no-nested-ternary */
// import request from '@/utils/request';
import { apiAccess, apiSecret, envNodeURL, migrateURL } from '@/utils/env';
import request from 'umi-request';
import Cookies from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};

const storeId = parseInt(Cookies.get('StoreId'), 10);

// const storeParams = typeof storeId !== 'undefined' && storeId !== null
//   ? storeId !== 'all'
//     ? `&store_id=${storeId}`
//     : ''
//   : '';

export async function getBillsAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? (pageStoreID == 'all' ? undefined : pageStoreID) : storeIDMain,
  };
  return request(`${envNodeURL}/clients/bills`, {
    headers,
    method: 'POST',
    data: payload,
  });
}
export async function getBillsAPIv2(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? (pageStoreID == 'all' ? undefined : pageStoreID) : storeIDMain,
  };
  return request(`${envNodeURL}/clients/bills_V2`, {
    headers,
    method: 'POST',
    data: payload,
  });
}
export async function getBillsPagesCountAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? (pageStoreID == 'all' ? undefined : pageStoreID) : storeIDMain,
  };
  return request(`${envNodeURL}/clients/count_v2`, {
    headers,
    method: 'POST',
    data: payload,
  });
}

export async function min_max_amount_v2API(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? (pageStoreID == 'all' ? undefined : pageStoreID) : storeIDMain,
  };
  return request(`${envNodeURL}/clients/min_max_amount_v2`, {
    headers,
    method: 'POST',
    data: payload,
  });
}
export async function aggClientBills_v2API(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? (pageStoreID == 'all' ? undefined : pageStoreID) : storeIDMain,
  };
  return request(`${envNodeURL}/clients/aggClientBills_v2`, {
    headers,
    method: 'POST',
    data: payload,
  });
}

export async function getBillsByIDAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${envNodeURL}/clients/bills/${params}`, {
    headers,
    method: 'GET',
    // data: params,
  });
}
export async function deleteBillByIDAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${envNodeURL}/clients/bills/delete`, {
    headers,
    method: 'POST',
    data: params,
  });
}

export async function exportBillCSVAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');

  const storeParams =
    typeof storeId !== 'undefined' && storeId !== null
      ? storeId !== 'all'
        ? storeId
        : undefined
      : undefined;
  const query = {
    ...params,
    store_id: storeParams,
  };
  return request(`${envNodeURL}/clients/bills/export/`, {
    headers,
    method: 'POST',
    data: query,
  });
}

export async function getPurchaseOrderAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeParams =
    typeof storeId !== 'undefined' && storeId !== null
      ? storeId !== 'all'
        ? storeId
        : undefined
      : undefined;
  const query = {
    ...params,
    store_id: storeParams,
  };
  return request(`${migrateURL}/clients/getpurchaseorder/`, {
    headers,
    method: 'POST',
    body: query,
    // responseType: 'blob',
  });
}

export async function BillsMetrixAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/analytics/skipReport`, {
    headers,
    method: 'POST',
    data: params,
    // responseType: 'blob',
  });
}

export async function ExportBillAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/analytics/skipReport`, {
    headers,
    method: 'POST',
    data: params,
  });
}
