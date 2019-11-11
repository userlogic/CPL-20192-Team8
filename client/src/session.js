"use strict";
exports.__esModule = true;
var React = require("react");
var Cookies = require("js-cookie");
exports.setSessionCookie = function (session) {
    const curSession = Cookies.get("session");

    // console.log(curSession);
    // console.log(session);

    if (curSession === session) {
        return;
    }
    else {
        console.log(curSession);
        console.log(session);
    }
    Cookies.remove("session");
    Cookies.set("session", session, { expires: 14 });
};
exports.getSessionCookie = function () {
    var sessionCookie = Cookies.get("session");
    if (sessionCookie === undefined) {
        return {};
    }
    else {
        return JSON.parse(sessionCookie);
    }
};
exports.SessionContext = React.createContext(exports.getSessionCookie());