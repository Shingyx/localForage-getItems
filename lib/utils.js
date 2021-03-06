export function getSerializerPromise(localForageInstance) {
    if (getSerializerPromise.result) {
        return getSerializerPromise.result;
    }
    if (!localForageInstance || typeof localForageInstance.getSerializer !== 'function') {
        return Promise.reject(new Error(
            'localforage.getSerializer() was not available! ' +
            'localforage v1.4+ is required!'));
    }
    getSerializerPromise.result = localForageInstance.getSerializer();
    return getSerializerPromise.result;
}

export function getDriverPromise(localForageInstance, driverName) {
    getDriverPromise.result = getDriverPromise.result || {};
    if (getDriverPromise.result[driverName]) {
        return getDriverPromise.result[driverName];
    }
    if (!localForageInstance || typeof localForageInstance.getDriver !== 'function') {
        return Promise.reject(new Error(
            'localforage.getDriver() was not available! ' +
            'localforage v1.4+ is required!'));
    }
    getDriverPromise.result[driverName] = localForageInstance.getDriver(driverName);
    return getDriverPromise.result[driverName];
}

export function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function(result) {
            callback(null, result);
        }, function(error) {
            callback(error);
        });
    }
    return promise;
}

export function getItemKeyValue(key, callback) {
    var localforageInstance = this;
    var promise = localforageInstance.getItem(key).then(function(value) {
        return {
            key: key,
            value: value
        };
    });
    executeCallback(promise, callback);
    return promise;
}
