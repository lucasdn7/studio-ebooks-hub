// Advanced caching system for performance optimization

interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items
  maxAge?: number; // Maximum age in milliseconds
  priority?: 'low' | 'normal' | 'high';
}

class CacheManager {
  private cache = new Map<string, CacheItem<unknown>>();
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes
  private readonly defaultMaxSize = 100;
  private readonly defaultMaxAge = 30 * 60 * 1000; // 30 minutes

  constructor(private options: CacheOptions = {}) {
    this.startCleanupInterval();
  }

  set<T>(key: string, data: T, options: CacheOptions = {}): void {
    const ttl = options.ttl ?? this.options.ttl ?? this.defaultTTL;
    const maxSize = options.maxSize ?? this.options.maxSize ?? this.defaultMaxSize;

    // Evict items if cache is full
    if (this.cache.size >= maxSize) {
      this.evictLeastUsed();
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccessed: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;

    // Check if item has expired
    if (this.isExpired(item)) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    item.accessCount++;
    item.lastAccessed = Date.now();

    return item.data as T;
  }

  has(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    if (this.isExpired(item)) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  private isExpired(item: CacheItem<unknown>): boolean {
    const now = Date.now();
    const maxAge = this.options.maxAge ?? this.defaultMaxAge;
    
    return (now - item.timestamp) > item.ttl || (now - item.timestamp) > maxAge;
  }

  private evictLeastUsed(): void {
    let leastUsedKey: string | null = null;
    let lowestScore = Infinity;

    for (const [key, item] of this.cache.entries()) {
      // Calculate score based on access count and last access time
      const timeSinceLastAccess = Date.now() - item.lastAccessed;
      const score = timeSinceLastAccess / (item.accessCount + 1);

      if (score < lowestScore) {
        lowestScore = score;
        leastUsedKey = key;
      }
    }

    if (leastUsedKey) {
      this.cache.delete(leastUsedKey);
    }
  }

  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanup();
    }, 60000); // Cleanup every minute
  }

  private cleanup(): void {
    const now = Date.now();
    
    for (const [key, item] of this.cache.entries()) {
      if (this.isExpired(item)) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats(): {
    size: number;
    hitRate: number;
    averageAge: number;
    oldestItem: number;
  } {
    const now = Date.now();
    let totalAge = 0;
    let oldestAge = 0;

    for (const item of this.cache.values()) {
      const age = now - item.timestamp;
      totalAge += age;
      oldestAge = Math.max(oldestAge, age);
    }

    return {
      size: this.cache.size,
      hitRate: 0, // Would need to track hits/misses
      averageAge: this.cache.size > 0 ? totalAge / this.cache.size : 0,
      oldestItem: oldestAge
    };
  }
}

// Specialized caches
export const apiCache = new CacheManager({ ttl: 2 * 60 * 1000, maxSize: 50 }); // 2 minutes
export const imageCache = new CacheManager({ ttl: 30 * 60 * 1000, maxSize: 200 }); // 30 minutes
export const userDataCache = new CacheManager({ ttl: 10 * 60 * 1000, maxSize: 20 }); // 10 minutes

// Cache decorator for functions
export function cached<T extends (...args: any[]) => any>(
  fn: T,
  options: CacheOptions = {}
): T {
  const cache = new CacheManager(options);
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    const cached = cache.get<ReturnType<T>>(key);
    
    if (cached !== null) {
      return cached;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Async cache decorator
export function asyncCached<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: CacheOptions = {}
): T {
  const cache = new CacheManager(options);
  
  return (async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    const key = JSON.stringify(args);
    const cached = cache.get<Awaited<ReturnType<T>>>(key);
    
    if (cached !== null) {
      return cached;
    }
    
    const result = await fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Local storage cache for persistence
export class PersistentCache {
  private readonly prefix = 'app_cache_';
  private readonly defaultTTL = 24 * 60 * 60 * 1000; // 24 hours

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    const item = {
      data,
      timestamp: Date.now(),
      ttl
    };

    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to store in localStorage:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const stored = localStorage.getItem(this.prefix + key);
      if (!stored) return null;

      const item = JSON.parse(stored);
      const now = Date.now();

      if (now - item.timestamp > item.ttl) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }

      return item.data;
    } catch (error) {
      console.warn('Failed to retrieve from localStorage:', error);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('Failed to delete from localStorage:', error);
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

export const persistentCache = new PersistentCache();

// Export main cache manager
export { CacheManager }; 