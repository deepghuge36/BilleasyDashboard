import { apiAccess, apiSecret, migrateURL } from '@/utils/env';
import request from 'umi-request';

const headers = {
  'Content-Type': 'application/json',
  // Accept: 'application/vnd.billeasy.v1',
  'x-api-access': apiAccess,
  'x-api-secret': apiSecret,
  // 'Access-Control-Allow-Origin': '*',
};

export async function clientLogin(params) {
  // console.log('login params', params);
  return request(`${migrateURL}/clients/sign-in`, {
    headers,
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
