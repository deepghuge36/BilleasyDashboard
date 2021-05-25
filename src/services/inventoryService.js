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

const storeId = parseInt(Cookies.get('StoreId'), 10);

// const storeParams = typeof storeId !== 'undefined' && storeId !== null
//   ? storeId !== 'all'
//     ? `&store_id=${storeId}`
//     : ''
//   : '';

export async function getInventoryListAPI(params) {
  headers['x-client-email'] = Cookies.get('BEmail');
  headers['x-client-token'] = Cookies.get('BAUT');
  // const payload = {
  //   ...params,
  //   store_id: storeId === 'all' ? undefined : storeId,
  // };
  return request(`${migrateURL}/inventory/getinventory`, {
    headers,
    method: 'POST',
    data: params,
  });
}
