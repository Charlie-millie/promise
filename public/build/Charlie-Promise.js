
                        ;(function () {
                            if (typeof window === 'undefined') {
                                return;
                            }

                            window.__css_reload = function () {
                                if (window.__styleLinkTimeout) {
                                    cancelAnimationFrame(window.__styleLinkTimeout);
                                }

                                window.__styleLinkTimeout = requestAnimationFrame(() => {
                                    var link = document.querySelector('link[href*="assets/Charlie-Promise-11ae4e00.css"]');

                                    if (link) {
                                        if (!window.__styleLinkHref) {
                                            window.__styleLinkHref = link.getAttribute('href');
                                        }

                                        var newLink = document.createElement('link');
                                        newLink.setAttribute('rel', 'stylesheet');
                                        newLink.setAttribute('type', 'text/css');
                                        newLink.setAttribute('href', window.__styleLinkHref + '?' + Date.now());
                                        newLink.onload = () => {
                                            link.remove();
                                        };

                                        document.head.appendChild(newLink);
                                    }
                                });
                            }
                        })();
                    
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CharliePromise = {}));
})(this, (function (exports) { 'use strict';

    function ___$insertStyle(css) {
        if (!css || typeof window === 'undefined') {
            return;
        }
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.innerHTML = css;
        document.head.appendChild(style);
        return css;
    }

    var CharliePromise = /** @class */ (function () {
        function CharliePromise(handler) {
            var _this = this;
            this.status = "pending"; // pending, fulfilled, rejected
            this.value = null;
            this.fulfillCallBacks = [];
            this.rejectCallBacks = [];
            this._resolve = function (value) {
                if (_this.status === "pending") {
                    _this.status = "fulfilled";
                    _this.value = value;
                    _this.fulfillCallBacks.forEach(function (fn) { return fn(value); });
                    console.log("[resolve] ", _this);
                }
            };
            this._reject = function (value) {
                if (_this.status === "pending") {
                    _this.status = "rejected";
                    _this.value = value;
                    _this.rejectCallBacks.forEach(function (fn) { return fn(value); });
                    console.log("[reject] ", _this);
                }
            };
            try {
                handler(this._resolve, this._reject);
            }
            catch (error) {
                this._reject(error);
            }
            // console.log("============Charlie Promise", this);
        }
        CharliePromise.prototype._fulfilledLastPromise = function (onFulfilled, resolve, reject) {
            try {
                var fulfilledLastPromise = onFulfilled(this.value);
                if (fulfilledLastPromise instanceof CharliePromise) {
                    fulfilledLastPromise.then(resolve, reject);
                }
                else {
                    resolve(fulfilledLastPromise);
                }
            }
            catch (error) {
                reject(error);
            }
        };
        CharliePromise.prototype._rejectedLastPromise = function (onRejected, resolve, reject) {
            try {
                var rejectedLastPromise = onRejected(this.value);
                if (rejectedLastPromise instanceof CharliePromise) {
                    rejectedLastPromise.then(resolve, reject);
                }
                else {
                    reject(rejectedLastPromise);
                }
            }
            catch (error) {
                reject(error);
            }
        };
        CharliePromise.prototype.then = function (onFulfilled, onRejected) {
            var _this = this;
            console.log("[then] ", this.status);
            return new CharliePromise(function (resolve, reject) {
                switch (_this.status) {
                    case "pending":
                        _this.fulfillCallBacks.push(function () {
                            _this._fulfilledLastPromise(onFulfilled, resolve, reject);
                        });
                        _this.rejectCallBacks.push(function () {
                            _this._rejectedLastPromise(onRejected, resolve, reject);
                        });
                        break;
                    case "fulfilled":
                        _this._fulfilledLastPromise(onFulfilled, resolve, reject);
                        break;
                    case "rejected":
                        _this._rejectedLastPromise(onRejected, resolve, reject);
                        break;
                }
            });
        };
        return CharliePromise;
    }());

    function polyfillPromise() {
        console.log("===polyfillPromise===", CharliePromise);
        /*if (!window.Promise) {
            window.Promise = CharliePromise;
        }*/
        window.Promise = CharliePromise;
        window.Promise.resolve = function (value) {
            console.log("==========resolve==============");
            if (value instanceof window.Promise) {
                return value;
            }
            else {
                return new window.Promise(function (resolve, reject) {
                    resolve(value);
                });
            }
        };
        window.Promise.reject = function (reason) {
            return new window.Promise(function (resolve, reject) {
                reject(reason);
            });
        };
        window.Promise.all = function (promises) {
            return new window.Promise(function (resolve, reject) {
                var counter = 0;
                var result = [];
                var _loop_1 = function (i) {
                    console.log("===>> promises[i]: ", promises[i]);
                    window.Promise.resolve(promises[i]).then(function (res) {
                        result[i] = res;
                        counter++;
                        console.log("### counter: ", counter, ' length: ', promises.length);
                        if (counter === promises.length) {
                            resolve(result);
                        }
                    }, function (error) {
                        reject(error);
                    });
                };
                for (var i = 0; i < promises.length; i++) {
                    _loop_1(i);
                }
            });
        };
    }
    polyfillPromise();

    exports.polyfillPromise = polyfillPromise;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=Charlie-Promise.js.map
