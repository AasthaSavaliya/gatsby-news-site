import {lf} from "./debug";

export const storeLocally = (key, val, JSONstringify = false) => {
    val = JSONstringify ? JSON.stringify(val) : val
    localStorage.setItem(key, val)
}

export const getLocallyStoredData = (key, parseJSON = false) => {
    let d = localStorage.getItem(key)
    return parseJSON ? JSON.parse(d) : d
}

export const getCookie = name => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const hasCookies = () => {
    return document.cookie.length > 0
}

export const getCookies = () => {
    return hasCookies() ? document.cookie.split('; ') : false;
}

export const clearCookies = () => {
    lf('clearCookies')
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
        let d = window.location.hostname.split(".");
        while (d.length > 0) {
            let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            let p = window.location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            }
            d.shift();
        }
    }
}
