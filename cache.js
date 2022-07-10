import { readFileSync, writeFileSync, existsSync } from 'fs';
import { CACHE_FILE } from './index';

export function cache(func) {
  return async function (...args) {
    const cacheFile = CACHE_FILE;

    const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile)) : {};
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = await func(...args);
    cache[key] = result;
    writeFileSync(cacheFile, JSON.stringify(cache));
    return result;
  };
}
