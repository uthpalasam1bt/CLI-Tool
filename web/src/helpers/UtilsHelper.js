import React from 'react';
import _ from 'lodash';
import { Modal } from 'antd';
import ConnectApi from '../middlewares/connectApi';

let _instance = null;
class UtilsHelper {
    throttleMap = [];

    static getInstance() {
        if (_instance === null) {
            _instance = new UtilsHelper();
        }

        return _instance;
    }

    matchRuleShort(str, rule) {
        return new RegExp('^' + rule.split('*').join('.*') + '$').test(str);
    }

    //used in finctional components, as its hard to throtlle events inside a functional component
    throttle(func, params, throttleDelay) {
        if (this.throttleMap.length > 50) this.throttleMap.shift(); //housekeeping
        const uniqueKey = func
            .toString()
            .split('')
            .reduce(function(a, b) {
                a = (a << 5) - a + b.charCodeAt(0);
                return a & a;
            }, 0);
        let throttleFunc =
            this.throttleMap.find(t => t.key === uniqueKey) ||
            (() => {
                let tf = { key: uniqueKey, func: _.debounce(func, throttleDelay) };
                this.throttleMap.push(tf);

                return tf;
            })();

        throttleFunc.func(...params);
    }

    retry(fn, ms = 100, count = null) {
        return new Promise(resolve => {
            fn()
                .then(resolve)
                .catch(ex => {
                    let i = count || 0;
                    if (i < 10) {
                        setTimeout(() => {
                            i++;
                            UtilsHelper.getInstance()
                                .retry(fn, 100, i)
                                .then(resolve);
                        }, ms);
                    } else {
                        UtilsHelper.getInstance().sendDebugLog(ex);
                        Modal.warning({
                            title: 'Poor Network Connection',
                            content: (
                                <div>
                                    <div>Please check your network connection...</div>
                                </div>
                            ),
                            onOk() {
                                window.location.reload(false);
                            }
                        });
                    }
                });
        });
    }

    sendDebugLog(exception) {
        const { message, name, description, number, fileName, lineNumber, columnNumber, stack } = exception;
        ConnectApi.sendDebugInfo({
            debugInfo: {
                message: message,
                name: name,
                description: description,
                number: number,
                fileName: fileName,
                lineNumber: lineNumber,
                columnNumber: columnNumber,
                stack: stack,
                time: new Date().toString(),
                deviceInfo: {
                    timeOpened: new Date(),
                    timezone: new Date().getTimezoneOffset() / 60,

                    pageon: window.location.pathname,
                    referrer: document.referrer,
                    previousSites: window.history.length,

                    browserName: navigator.appName,
                    browserEngine: navigator.product,
                    browserVersion1a: navigator.appVersion,
                    browserVersion1b: navigator.userAgent,
                    browserLanguage: navigator.language,
                    browserOnline: navigator.onLine,
                    browserPlatform: navigator.platform,
                    javaEnabled: navigator.javaEnabled(),
                    dataCookiesEnabled: navigator.cookieEnabled,
                    dataCookies1: document.cookie,
                    dataCookies2: decodeURIComponent(document.cookie.split(';')),
                    dataStorage: localStorage,
                    sessionStorage: sessionStorage,

                    sizeScreenW: window.screen.width,
                    sizeScreenH: window.screen.height,
                    sizeDocW: document.width,
                    sizeDocH: document.height,
                    sizeInW: window.innerWidth,
                    sizeInH: window.innerHeight,
                    sizeAvailW: window.screen.availWidth,
                    sizeAvailH: window.screen.availHeight,
                    scrColorDepth: window.screen.colorDepth,
                    scrPixelDepth: window.screen.pixelDepth
                }
            }
        });
    }
}

export default UtilsHelper;
