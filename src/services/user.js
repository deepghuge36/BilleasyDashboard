// import request from '@/utils/request';
import { apiAccess, apiSecret, migrateURL } from '@/utils/env';
import request from 'umi-request';

const headers = {
  'Content-Type': 'application/json',
  // Accept: 'application/vnd.billeasy.v1',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};


export async function query() {
  return request('/api/users');
}
export async function verifyAuthAPI(params) {
  return request(`${migrateURL}/clients/verify-auth`, {
    headers,
    method: 'POST',
    data: params,
  });
}
export async function queryNotices() {
  return request('/api/notices');
}
