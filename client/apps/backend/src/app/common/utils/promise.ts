export function wrapInPromise<T>(callback: (...args) => T): Promise<T> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<T>(async (resolve, reject) => {
    try {
      const result: T = await callback();
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}
