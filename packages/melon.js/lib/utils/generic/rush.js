// @flow

/**
 * Rush: If `promise` didn't resolve before `wait` miliseconds: recect with
 * `errMsg`
 * @throws rejects the promise
 */
const rush = async (
  promise: Promise<any>,
  errMsg: string,
  wait: number = 30000,
): Promise<any> =>
  wait
    ? Promise.race([
        promise,
        new Promise((resolve, reject) =>
          global.setTimeout(
            () =>
              reject(
                new Error(
                  `${promise} took longer than ${wait /
                    1000} seconds to fulfill/reject: ${errMsg}`,
                ),
              ),
            wait,
          ),
        ),
      ])
    : promise;

export default rush;
