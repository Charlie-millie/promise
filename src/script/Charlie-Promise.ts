
export default class CharliePromise {
    status: string;
    fulfillCallBacks: Array<any>;
    rejectCallBacks: Array<any>;
    value: any;
    _resolve: (value: any) => void;
    _reject: (value: any) => void;
    constructor(handler: Function) {

        this.status = "pending"; // pending, fulfilled, rejected
        this.value = null;
        this.fulfillCallBacks = [];
        this.rejectCallBacks = [];

        this._resolve = (value) => {
            if (this.status === "pending") {
                this.status = "fulfilled";
                this.value = value;

                this.fulfillCallBacks.forEach(fn => fn(value));
                console.log("[resolve] ", this);
            }
        };

        this._reject = (value) => {
            if (this.status === "pending") {
                this.status = "rejected";
                this.value = value;

                this.rejectCallBacks.forEach(fn => fn(value));
                console.log("[reject] ", this);
            }
        };

        try {
            handler(this._resolve, this._reject);
        } catch (error) {
            this._reject(error);
        }

        // console.log("============Charlie Promise", this);
    }

    _fulfilledLastPromise(onFulfilled, resolve, reject) {
        try {
            const fulfilledLastPromise = onFulfilled(this.value);
            if (fulfilledLastPromise instanceof CharliePromise) {
                fulfilledLastPromise.then(resolve, reject);
            } else {
                resolve(fulfilledLastPromise);
            }
        } catch (error) {
            reject(error);
        }
    }

    _rejectedLastPromise(onRejected, resolve, reject) {
        try {
            const rejectedLastPromise = onRejected(this.value);
            if (rejectedLastPromise instanceof CharliePromise) {
                rejectedLastPromise.then(resolve, reject);
            } else {
                reject(rejectedLastPromise);
            }
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        console.log("[then] ", this.status);
        return new CharliePromise((resolve, reject) => {
            switch (this.status) {
                case "pending":
                    this.fulfillCallBacks.push(() => {
                        this._fulfilledLastPromise(onFulfilled, resolve, reject);
                    });
                    this.rejectCallBacks.push(() => {
                        this._rejectedLastPromise(onRejected, resolve, reject);
                    });
                    break;
                case "fulfilled":
                    this._fulfilledLastPromise(onFulfilled, resolve, reject);
                    break;
                case "rejected":
                    this._rejectedLastPromise(onRejected, resolve, reject);
                    break;
            }
        });
    }

}

