const apiVersion = 'v1'; //eslint-disable-line
export const envURL =
  process.env.NODE_ENV !== 'production'
    ? 'https://staging.billeasy.in/api'
    : 'https://billeasy.in/api';

// export const envNodeURL = process.env.NODE_ENV !== 'production' ? `http://node-staging.billeasy.in/api/${apiVersion}` : `https://node.billeasy.in/api/${apiVersion}`;
export const envNodeURL =
  process.env.NODE_ENV !== 'production'
    ? `https://node-staging.billeasy.in/api/${apiVersion}`
    : `https://node.billeasy.in/api/${apiVersion}`;

export const migrateURL =
  process.env.NODE_ENV !== 'production'
    ? `http://node-client-service.ap-south-1.elasticbeanstalk.com/api/${apiVersion}`
    : `https://client.billeasy.in/api/${apiVersion}`;

// export const notificationSocket = 'http://111.119.217.234:4001/';

export const authenticationToken =
  process.env.NODE_ENV !== 'production'
    ? '0fiXlrXdHOwgHTkIAvUitphGo35g+FLY9MAyz3YhYhl1sCP4BsBkCNb+q5mT05Zo6emVw1Px+uz9t13FubtReg=='
    : '';

export const apiAccess =
  process.env.NODE_ENV !== 'production' ? '_1EALRMMuwKtEMG-NFwgzA' : '9NR51e2HgVCu3WV_06r73w';

export const apiSecret =
  process.env.NODE_ENV !== 'production'
    ? '4c21c6aa511c24c70b34a5125f30f8a8bf2ef812edfe11cb6237192b51a8b677'
    : '370263e13356c3ed879cc2e1025d798347d0ff9c9a815c2c332910e8a48df4f1';

export const cashFreeMode = process.env.NODE_ENV !== 'production' ? 'TEST' : 'PROD';
export const PayUBizURL =
  process.env.NODE_ENV !== 'production'
    ? 'https://test.payu.in/_payment'
    : 'https://secure.payu.in/_payment';
