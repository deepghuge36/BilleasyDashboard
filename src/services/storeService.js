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

export async function getStoreListAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/clients/store`, {
    headers,
    method: 'POST',
    data: params,
  });
}

export async function deviceMappingListAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/clients/storesList`, {
    method: 'POST',
    headers,
    data: params,
  });
}

export async function devicesbystoreAPI(params) {
  const req = params || '';
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/clients/devicesbystore?${req}`, {
    method: 'GET',
    headers,
    // body: params,
  });
}

export async function storeAnalyticsAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  return request(`${migrateURL}/analytics/dashboardStoreAnalytics`, {
    method: 'POST',
    headers,
    data: params,
  });
}