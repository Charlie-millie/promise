import CharliePromise from "./Charlie-Promise";

declare global {
    interface Window {
        Promise: any;
    }
}
export function polyfillPromise() {
    console.log("===polyfillPromise===", CharliePromise);

    /*if (!window.Promise) {
        window.Promise = CharliePromise;
    }*/
    window.Promise = CharliePromise;

    window.Promise.resolve = (value) => {
        console.log("==========resolve==============");
        if (value instanceof window.Promise) {
            return value;
        } else {
            return new window.Promise((resolve, reject) => {
                resolve(value);
            });
        }
    };

    window.Promise.reject = (reason) => {
        return new window.Promise((resolve, reject) => {
            reject(reason);
        });
    };

    window.Promise.all = (promises) => {
        return new window.Promise((resolve, reject) => {
            let counter: number = 0;
            const result: Array<any> = [];
            for (let i = 0; i < promises.length; i++) {
                console.log("===>> promises[i]: ", promises[i]);
                window.Promise.resolve(promises[i]).then(res => {
                    result[i] = res;
                    counter++;

                    console.log("### counter: ", counter,  ' length: ', promises.length);
                    if (counter === promises.length) {
                        resolve(result);
                    }
                }, error => {
                    reject(error);
                });
            }
        });
    };
}

polyfillPromise();
