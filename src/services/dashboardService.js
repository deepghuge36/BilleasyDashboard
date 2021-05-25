/* eslint-disable no-nested-ternary */
import { apiAccess, apiSecret, migrateURL } from '@/utils/env';
import request from 'umi-request';
import Cookies from 'js-cookie';

const headers = {
  'Content-Type': 'application/json',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};



export async function fetchDashboard() {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  const storeId = Cookies.get('StoreId');
  const storeParams = (typeof storeId !== 'undefined' && storeId !== null) ? (storeId !== 'all' ? `store_id=${storeId}` : '') : '';
  return request(`${migrateURL}/clients/dashboard?${storeParams}`, {
    method: 'GET',
    headers,
  });
}
