(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
/**
 * This file taken from
 * https://github.com/jfriend00/docReady
 * Originally: Copyright (c) 2014, John Friend
 *
 * This file is provided with modifications, under the MIT License, a copy of
 * which is available at the root of this repository.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var readyList = [];
var readyFired = false;
var readyEventHandlersInstalled = false;
// call this when the document is ready
// this function protects itself against being called more than once
function ready() {
    if (!readyFired) {
        // this must be set to true before we start calling callbacks
        readyFired = true;
        for (var i = 0; i < readyList.length; i++) {
            // if a callback here happens to add new ready handlers,
            // the docReady() function will see that it already fired
            // and will schedule the callback to run right after
            // this event loop finishes so all handlers will still execute
            // in order and no new ones will be added to the readyList
            // while we are processing the list
            setTimeout(readyList[i], 1);
        }
        // allow any closures held by these functions to free
        readyList = [];
    }
}
function readyStateChange() {
    if (document.readyState === "complete") {
        ready();
    }
}
// This is the one public interface
// docReady(fn, context);
// the context argument is optional - if present, it will be passed
// as an argument to the callback
function onDocReady(callback) {
    if (typeof callback !== "function") {
        throw new TypeError("callback for docReady(fn) must be a function");
    }
    // if ready has already fired, then just schedule the callback
    // to fire asynchronously, but right away
    if (readyFired) {
        setTimeout(function () { return callback(); }, 1);
        return;
    }
    else {
        // add the function to the list
        readyList.push(callback);
    }
    // if document already ready to go, schedule the ready function to run
    // IE only safe when readyState is "complete", others safe when readyState is "interactive"
    if (document.readyState === "complete" ||
        (!("attachEvent" in document) && document.readyState === "interactive")) {
        setTimeout(ready, 1);
    }
    else if (!readyEventHandlersInstalled) {
        // otherwise if we don't have event handlers installed, install them
        if (document.addEventListener) {
            // first choice is DOMContentLoaded event
            document.addEventListener("DOMContentLoaded", ready, false);
            // backup is window load event
            window.addEventListener("load", ready, false);
        }
        else {
            // must be IE
            document.attachEvent("onreadystatechange", readyStateChange);
            window.attachEvent("onload", ready);
        }
        readyEventHandlersInstalled = true;
    }
}
exports.default = onDocReady;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Thanks to https://medium.com/walmartlabs/infinite-scrolling-the-right-way-11b098a08815
function default_1(footer, callback) {
    var options = { rootMargin: "40px" };
    var observerCallback = function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && entry.target === footer) {
                callback();
            }
        });
    };
    var observer = new IntersectionObserver(observerCallback, options);
    observer.observe(footer);
}
exports.default = default_1;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var docready_1 = require("./docready");
var footerVisible_1 = require("./footerVisible");
var footer = null;
function determineFooterElement() {
    return (document.querySelector("footer") ||
        document.querySelector(".footer") ||
        document.querySelector("#footer"));
}
function insertInfiniteScrollItems() {
    var _a;
    if (((_a = footer) === null || _a === void 0 ? void 0 : _a.parentNode) == null)
        return;
    // Whoa. An old-school for-loop.
    for (var i = 0; i < 5; i++) {
        var img = document.createElement("img");
        img.src = "https://picsum.photos/300/200";
        footer.parentNode.insertBefore(img, footer);
    }
}
function footerCallback() {
    setTimeout(function () { return insertInfiniteScrollItems(); }, 500);
}
docready_1.default(function () {
    footer = determineFooterElement();
    if (footer != null) {
        footerVisible_1.default(footer, function () { return footerCallback(); });
    }
});

},{"./docready":1,"./footerVisible":2}]},{},[3]);
