import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

import moment from 'moment';
import 'moment/locale/es';
// without this line it didn't work
moment.locale('en');

// moment.locale('en-US');
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const getDateReadable = (date) => {
  // for displaying date as -> 30 Nov 2018
  return moment(date).format('DD MMM YYYY');
};

export const getFormattedDate = (date) => {
  // for displaying date as -> 30 Nov 18, 01:30 AM
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  if (moment(date).isSame(today, 'day')) {
    return `Today, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  if (moment(date).isSame(yesterday, 'day')) {
    return `Yesterday, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  return moment(date).locale('en').format('DD MMM YY, hh:mm A');
};

export const getFilterDate = (date) => {
  // for displaying date as YESTERDAY or TODAY's text
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  if (moment(date).isSame(today, 'day')) {
    return 'TODAY';
  }
  if (moment(date).isSame(yesterday, 'day')) {
    return 'YESTERDAY';
  }
  return moment(date).locale('en').format('DD MMM YY, hh:mm A');
};

export const stdFormattedDate = (date) => {
  // for displaying date as 22 December 2019, 00:00 or Tomorrow, 00:00
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');
  if (moment(date).isSame(today, 'day')) {
    return `Today, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  if (moment(date).isSame(yesterday, 'day')) {
    return `Yesterday, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  if (moment(date).isSame(tomorrow, 'day')) {
    return `Tomorrow, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  return moment(date).locale('en').format('DD MMM YYYY, hh:mm A');
};

export const commonFormattedDate = (date) => {
  // for displaying date as 22 December 2019, 00:00 or Tomorrow, 00:00
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');
  if (moment(date).isSame(today, 'day')) {
    return `Today, ${moment(date).locale('en').utc().format('hh:mm A')}`;
  }
  if (moment(date).isSame(yesterday, 'day')) {
    return `Yesterday, ${moment(date).locale('en').utc().format('hh:mm A')}`;
  }
  if (moment(date).isSame(tomorrow, 'day')) {
    return `Tomorrow, ${moment(date).locale('en').utc().format('hh:mm A')}`;
  }
  return moment(date).utc().locale('en').format('DD MMM YYYY, hh:mm A');
};

export const getReadableFormatDate = (date) => {
  // for displaying date as -> Fri, 20 February or Tomorrow, 00:00
  const today = moment();
  const yesterday = moment().subtract(1, 'day');
  const tomorrow = moment().add(1, 'day');
  if (moment(date).isSame(today, 'day')) {
    return `Today, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  if (moment(date).isSame(yesterday, 'day')) {
    return `Yesterday, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  if (moment(date).isSame(tomorrow, 'day')) {
    return `Tomorrow, ${moment(date).locale('en').format('hh:mm A')}`;
  }
  return moment(date).locale('en').format('ddd, Do MMM YYYY');
};
