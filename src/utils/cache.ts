// /src/lib/cache.ts

import { unstable_cache as cache } from 'next/cache'

type CacheableFunction = (...args: any[]) => Promise<any>

export function cacheWithTags<T extends CacheableFunction>(fn: T, tags: string | string[]) {
  return cache(fn, undefined, { tags: Array.isArray(tags) ? tags : [tags] }) as T
}
