// Analytics and metrics tracking system

interface AnalyticsEvent {
  name: string;
  properties: Record<string, unknown>;
  timestamp: string;
  userId?: string;
  sessionId: string;
  page: string;
  userAgent: string;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: string;
  url: string;
  userId?: string;
}

interface UserBehavior {
  pageViews: number;
  timeOnSite: number;
  interactions: number;
  conversions: number;
}

// Performance API types
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources?: LayoutShiftAttribution[];
}

interface LayoutShiftAttribution {
  node?: Node;
  currentRect: DOMRectReadOnly;
  previousRect: DOMRectReadOnly;
}

class Analytics {
  private sessionId: string;
  private userId?: string;
  private events: AnalyticsEvent[] = [];
  private metrics: PerformanceMetric[] = [];
  private startTime: number;
  private pageStartTime: number;
  private currentPage: string;
  private batchSize = 20;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.pageStartTime = Date.now();
    this.currentPage = window.location.pathname;
    this.setupTracking();
    this.startPeriodicFlush();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private setupTracking(): void {
    // Track page views
    this.trackPageView();

    // Track navigation
    window.addEventListener('popstate', () => {
      this.trackPageView();
    });

    // Track user interactions
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        this.trackEvent('user_interaction', {
          type: 'click',
          element: target.tagName.toLowerCase(),
          text: target.textContent?.trim().substring(0, 50),
          href: (target as HTMLAnchorElement).href
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      this.trackEvent('form_submission', {
        formId: form.id || form.className,
        action: form.action
      });
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        if (scrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
          this.trackEvent('scroll_depth', {
            depth: scrollDepth
          });
        }
      }
    });

    // Track performance metrics
    this.trackPerformanceMetrics();
  }

  private trackPageView(): void {
    const previousPage = this.currentPage;
    this.currentPage = window.location.pathname;
    
    // Track time on previous page
    if (previousPage) {
      const timeOnPage = Date.now() - this.pageStartTime;
      this.trackEvent('page_view', {
        page: this.currentPage,
        timeOnPreviousPage: timeOnPage,
        referrer: previousPage
      });
    }

    this.pageStartTime = Date.now();
  }

  private trackPerformanceMetrics(): void {
    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackMetric('lcp', lastEntry.startTime, 'ms');
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as PerformanceEventTiming;
          this.trackMetric('fid', fidEntry.processingStart - fidEntry.startTime, 'ms');
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const layoutShiftEntry = entry as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        });
        this.trackMetric('cls', clsValue, 'score');
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      this.trackMetric('page_load_time', loadTime, 'ms');
    });
  }

  trackEvent(name: string, properties: Record<string, unknown> = {}): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date().toISOString(),
      userId: this.userId,
      sessionId: this.sessionId,
      page: this.currentPage,
      userAgent: navigator.userAgent
    };

    this.events.push(event);

    // Log in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', event);
    }
  }

  trackMetric(name: string, value: number, unit: string): void {
    const metric: PerformanceMetric = {
      name,
      value,
      unit,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userId: this.userId
    };

    this.metrics.push(metric);
  }

  // Specific tracking methods
  trackPurchase(amount: number, currency: string, productId: string): void {
    this.trackEvent('purchase', {
      amount,
      currency,
      productId,
      revenue: amount
    });
  }

  trackSignUp(method: string): void {
    this.trackEvent('sign_up', {
      method,
      timestamp: new Date().toISOString()
    });
  }

  trackLogin(method: string): void {
    this.trackEvent('login', {
      method,
      timestamp: new Date().toISOString()
    });
  }

  trackEbookView(ebookId: string, title: string): void {
    this.trackEvent('ebook_view', {
      ebookId,
      title,
      page: this.currentPage
    });
  }

  trackEbookDownload(ebookId: string, title: string): void {
    this.trackEvent('ebook_download', {
      ebookId,
      title,
      page: this.currentPage
    });
  }

  trackSearch(query: string, results: number): void {
    this.trackEvent('search', {
      query,
      results,
      page: this.currentPage
    });
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  private startPeriodicFlush(): void {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0 && this.metrics.length === 0) return;

    try {
      // Send events
      if (this.events.length > 0) {
        const eventsToSend = this.events.splice(0, this.batchSize);
        await this.sendEvents(eventsToSend);
      }

      // Send metrics
      if (this.metrics.length > 0) {
        const metricsToSend = this.metrics.splice(0, this.batchSize);
        await this.sendMetrics(metricsToSend);
      }
    } catch (error) {
      console.error('Failed to flush analytics:', error);
    }
  }

  private async sendEvents(events: AnalyticsEvent[]): Promise<void> {
    if (import.meta.env.PROD) {
      try {
        await fetch('/api/analytics/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(events),
        });
      } catch (error) {
        console.error('Failed to send analytics events:', error);
      }
    }
  }

  private async sendMetrics(metrics: PerformanceMetric[]): Promise<void> {
    if (import.meta.env.PROD) {
      try {
        await fetch('/api/analytics/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metrics),
        });
      } catch (error) {
        console.error('Failed to send analytics metrics:', error);
      }
    }
  }

  // Get analytics data
  getSessionData(): {
    sessionId: string;
    userId?: string;
    timeOnSite: number;
    pageViews: number;
    events: number;
  } {
    return {
      sessionId: this.sessionId,
      userId: this.userId,
      timeOnSite: Date.now() - this.startTime,
      pageViews: this.events.filter(e => e.name === 'page_view').length,
      events: this.events.length
    };
  }
}

// Create global instance
export const analytics = new Analytics();

// Export convenience functions
export const trackEvent = (name: string, properties?: Record<string, unknown>) => {
  analytics.trackEvent(name, properties);
};

export const trackPurchase = (amount: number, currency: string, productId: string) => {
  analytics.trackPurchase(amount, currency, productId);
};

export const trackSignUp = (method: string) => {
  analytics.trackSignUp(method);
};

export const trackLogin = (method: string) => {
  analytics.trackLogin(method);
};

export const trackEbookView = (ebookId: string, title: string) => {
  analytics.trackEbookView(ebookId, title);
};

export const trackEbookDownload = (ebookId: string, title: string) => {
  analytics.trackEbookDownload(ebookId, title);
};

export const trackSearch = (query: string, results: number) => {
  analytics.trackSearch(query, results);
};

export const setUserId = (userId: string) => {
  analytics.setUserId(userId);
}; 