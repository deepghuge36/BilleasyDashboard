// @ts-nocheck
import {
  createIntl,
  IntlShape,
  MessageDescriptor,
} from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/node_modules/react-intl';
import { ApplyPluginsType } from 'umi';
import { event, LANG_CHANGE_EVENT } from './locale';
// @ts-ignore
import warning from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/node_modules/warning/warning.js';

import { plugin } from '../core/plugin';

export {
  createIntl,
};
export {
  FormattedDate,
  FormattedDateParts,
  FormattedDisplayName,
  FormattedHTMLMessage,
  FormattedList,
  FormattedMessage,
  FormattedNumber,
  FormattedNumberParts,
  FormattedPlural,
  FormattedRelativeTime,
  FormattedTime,
  FormattedTimeParts,
  IntlContext,
  IntlProvider,
  RawIntlProvider,
  createIntlCache,
  defineMessages,
  injectIntl,
  useIntl,
} from '/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/node_modules/react-intl';

let g_intl: IntlShape;

const useLocalStorage = true;

export const localeInfo: {[key: string]: any} = {
  'en': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/analysis/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/flow/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/koni/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/mind/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/basic-form/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/step-form/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/fail/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/success/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register-result/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register/locales/en-US.js')),
    },
    locale: 'en-US',
    antd: {
      ...require('antd/es/locale/en_US').default,
    },
    momentLocale: '',
  },
  'en-US': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/analysis/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/flow/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/koni/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/mind/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/basic-form/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/form/step-form/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/fail/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/success/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register-result/locales/en-US.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register/locales/en-US.js')),
    },
    locale: 'en-US',
    antd: {
      ...require('antd/es/locale/en_US').default,
    },
    momentLocale: '',
  },
  'zh-CN': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/flow/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/koni/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/editor/mind/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/fail/locales/zh-CN.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register/locales/zh-CN.js')),
    },
    locale: 'zh-CN',
    antd: {
      ...require('antd/es/locale/en_US').default,
    },
    momentLocale: '',
  },
  'zh-TW': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/account/settings/locales/zh-TW.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/locales/zh-TW.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500/locales/zh-TW.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/result/fail/locales/zh-TW.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/User/register/locales/zh-TW.js')),
    },
    locale: 'zh-TW',
    antd: {
      ...require('antd/es/locale/en_US').default,
    },
    momentLocale: '',
  },
  'pt-BR': {
    messages: {
      ...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/dashboard/monitor/locales/pt-BR.js')),...((locale) => locale.__esModule ? locale.default : locale)(require('/Users/billeasysmacmini5/Desktop/antd pro js/Billeasy/src/pages/exception/500/locales/pt-BR.js')),
    },
    locale: 'pt-BR',
    antd: {
      ...require('antd/es/locale/en_US').default,
    },
    momentLocale: '',
  },
};

/**
 * 增加一个新的国际化语言
 * @param name 语言的 key
 * @param messages 对应的枚举对象
 * @param extraLocale momentLocale, antd 国际化
 */
export const addLocale = (
  name: string,
  messages: Object,
  extraLocales: {
    momentLocale:string;
    antd:string
  },
) => {
  if (!name) {
    return;
  }
  // 可以合并
  const mergeMessages = localeInfo[name]?.messages
    ? Object.assign({}, localeInfo[name].messages, messages)
    : messages;

  const { momentLocale, antd } = extraLocales || {};
  localeInfo[name] = {
    messages: mergeMessages,
    locale: name.split('-')?.join('-'),
    momentLocale: momentLocale,
    antd,
  };
};

/**
 * 获取当前的 intl 对象，可以在 node 中使用
 * @param locale 需要切换的语言类型
 * @param changeIntl 是否不使用 g_intl
 * @returns IntlShape
 */
export const getIntl = (locale?: string, changeIntl?: boolean) => {
  // 如果全局的 g_intl 存在，且不是 setIntl 调用
  if (g_intl && !changeIntl && !locale) {
    return g_intl;
  }
  // 如果存在于 localeInfo 中
  if (locale&&localeInfo[locale]) {
    return createIntl(localeInfo[locale]);
  }
  // 不存在需要一个报错提醒
  warning(
    !locale||!!localeInfo[locale],
    `The current popular language does not exist, please check the locales folder!`,
  );
  // 使用 zh-CN
  if (localeInfo["en-US"]) return createIntl(localeInfo["en-US"]);

  // 如果还没有，返回一个空的
  return createIntl({
    locale: "en-US",
    messages: {},
  });
};

/**
 * 切换全局的 intl 的设置
 * @param locale 语言的key
 */
export const setIntl = (locale: string) => {
  g_intl = getIntl(locale, true);
};

/**
 * 获取当前选择的语言
 * @returns string
 */
export const getLocale = () => {
  const runtimeLocale = plugin.applyPlugins({
    key: 'locale',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  // runtime getLocale for user define
  if (typeof runtimeLocale?.getLocale === 'function') {
    return runtimeLocale.getLocale();
  }
  // please clear localStorage if you change the baseSeparator config
  // because changing will break the app
  const lang =
    typeof localStorage !== 'undefined' && useLocalStorage
      ? window.localStorage.getItem('umi_locale')
      : '';
  // support baseNavigator, default true
  let browserLang;
  const isNavigatorLanguageValid =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string';
  browserLang = isNavigatorLanguageValid
    ? navigator.language.split('-').join('-')
    : '';
  return lang || browserLang || "en-US";
};


/**
 * 获取当前选择的方向
 * @returns string
 */
export const getDirection = () => {
  const lang = getLocale();
  // array with all prefixs for rtl langueges ex: ar-EG , he-IL
  const rtlLangs = ['he', 'ar', 'fa', 'ku']
  const direction =  rtlLangs.filter(lng => lang.startsWith(lng)).length ? 'rtl' : 'ltr';
  return direction;
};

/**
 * 切换语言
 * @param lang 语言的 key
 * @param realReload 是否刷新页面，默认刷新
 * @returns string
 */
export const setLocale = (lang: string, realReload: boolean = true) => {
  const localeExp = new RegExp(`^([a-z]{2})-?([A-Z]{2})?$`);

  const runtimeLocale = plugin.applyPlugins({
    key: 'locale',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });

  const updater = () => {
    if (lang !== undefined && !localeExp.test(lang)) {
      // for reset when lang === undefined
      throw new Error('setLocale lang format error');
    }
    if (getLocale() !== lang) {
      if (typeof window.localStorage !== 'undefined' && useLocalStorage) {
        window.localStorage.setItem('umi_locale', lang || '');
      }
      setIntl(lang);
      if (realReload) {
        window.location.reload();
      } else {
        event.emit(LANG_CHANGE_EVENT, lang);
        // chrome 不支持这个事件。所以人肉触发一下
        if (window.dispatchEvent) {
          const event = new Event('languagechange');
          window.dispatchEvent(event);
        }
      }
    }
  }

  if (typeof runtimeLocale?.setLocale === 'function') {
    runtimeLocale.setLocale({
      lang,
      realReload,
      updater: updater,
    });
    return;
  }

  updater();
};

let firstWaring = true;

/**
 * intl.formatMessage 的语法糖
 * @deprecated 使用此 api 会造成切换语言的时候无法自动刷新，请使用 useIntl 或 injectIntl
 * @param descriptor { id : string, defaultMessage : string }
 * @param values { [key:string] : string }
 * @returns string
 */
export const formatMessage: IntlShape['formatMessage'] = (
  descriptor: MessageDescriptor,
  values: any,
) => {
  if (firstWaring) {
    warning(
      false,
      `Using this API will cause automatic refresh when switching languages, please use useIntl or injectIntl.

使用此 api 会造成切换语言的时候无法自动刷新，请使用 useIntl 或 injectIntl。

http://j.mp/37Fkd5Q
      `,
    );
    firstWaring = false;
  }
  return g_intl.formatMessage(descriptor, values);
};

/**
 * 获取语言列表
 * @returns string[]
 */
export const getAllLocales = () => Object.keys(localeInfo);
