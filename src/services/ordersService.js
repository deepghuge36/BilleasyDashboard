/* eslint-disable no-nested-ternary */
import { apiAccess, apiSecret, envNodeURL, migrateURL } from '@/utils/env';
import request from 'umi-request';
import Cookies from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
  // Accept: 'application/vnd.billeasy.v1',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};

export async function getOrdersListAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeIDMain = Cookies.get('StoreId');
  const pageStoreID = Cookies.get('pageStoreID');
  const payload = {
    ...params,
    store_id: storeIDMain == 'all' ? pageStoreID == 'all' ? undefined : pageStoreID : storeIDMain,
  };

  return request(`${migrateURL}/orders/dashboardOrders`, {
    method: 'POST',
    headers,
    data: payload,
  });
}
export async function getOrderByIDAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${envNodeURL}/clients/getorderbyid`, {
    method: 'POST',
    headers,
    data: params,
  });
}

export async function cancelOrderAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  console.log('params of order id:', params);
  const id = params.orderId;
  return request(`${envNodeURL}/clients/cancelOrder?order_id=${id}`, {
    method: 'GET',
    headers,
    // body: params,
  });
}

export async function deliveryStatusAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${envNodeURL}/clients/DeliveryStatus`, {
    method: 'POST',
    headers,
    data: params,
  });
}

export async function exportOrderAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/orders/exportorderscsv`, {
    method: 'POST',
    headers,
    data: params,
  });
}

export async function updatestepAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/chatbot/updatestep`, {
    method: 'POST',
    headers,
    data: params,
  });
}
