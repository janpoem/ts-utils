const timers: Record<string, ReturnType<typeof setTimeout>> = {};

/**
 * 命名 setTimeout，同一 key 会先清除已有的定时器再重新设置
 *
 * @param key 定时器标识
 * @param callback 回调函数（支持 async）
 * @param ms 延迟毫秒数
 */
export const timer = (
  key: string,
  callback: () => void | Promise<void>,
  ms: number,
): ReturnType<typeof setTimeout> => {
  clearTimer(key);
  timers[key] = setTimeout(() => void callback(), ms);
  return timers[key];
};

/**
 * 清除命名 setTimeout
 *
 * @param key 定时器标识
 */
export const clearTimer = (key: string): void => {
  if (key in timers) {
    clearTimeout(timers[key]);
    delete timers[key];
  }
};

const tickers: Record<string, ReturnType<typeof setInterval>> = {};

/**
 * 命名 setInterval，同一 key 会先清除已有的间隔器再重新设置
 *
 * @param key 间隔器标识
 * @param callback 回调函数（支持 async）
 * @param ms 间隔毫秒数
 */
export const ticker = (
  key: string,
  callback: () => void | Promise<void>,
  ms: number,
): ReturnType<typeof setInterval> => {
  clearTicker(key);
  tickers[key] = setInterval(() => void callback(), ms);
  return tickers[key];
};

/**
 * 清除命名 setInterval
 *
 * @param key 间隔器标识
 */
export const clearTicker = (key: string): void => {
  if (key in tickers) {
    clearInterval(tickers[key]);
    delete tickers[key];
  }
};
