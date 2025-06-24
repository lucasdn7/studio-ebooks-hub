// Error monitoring and reporting system

interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  userId?: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: Record<string, unknown>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: string;
  url: string;
  userId?: string;
}

class ErrorMonitor {
  private sessionId: string;
  private userId?: string;
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceMetric[] = [];
  private isOnline = navigator.onLine;
  private batchSize = 10;
  private flushInterval = 30000; // 30 seconds

  constructor() {
    this.sessionId = this.generateSessionId();
    this.setupEventListeners();
    this.startPeriodicFlush();
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private setupEventListeners(): void {
    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueues();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    });

    // Unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError(new Error(event.reason), {
        type: 'unhandledrejection'
      });
    });

    // Performance monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.capturePerformanceMetric(entry);
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    }
  }

  private startPeriodicFlush(): void {
    setInterval(() => {
      this.flushQueues();
    }, this.flushInterval);
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  captureError(error: Error, context: Record<string, unknown> = {}): void {
    const errorReport: ErrorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: this.userId,
      sessionId: this.sessionId,
      severity: this.determineSeverity(error),
      context: {
        ...context,
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    };

    this.errorQueue.push(errorReport);
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('Error captured:', errorReport);
    }

    // Flush immediately for critical errors
    if (errorReport.severity === 'critical') {
      this.flushQueues();
    }
  }

  private determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch')) {
      return 'medium';
    }
    
    if (message.includes('auth') || message.includes('permission')) {
      return 'high';
    }
    
    if (message.includes('payment') || message.includes('security')) {
      return 'critical';
    }
    
    return 'low';
  }

  capturePerformanceMetric(entry: PerformanceEntry): void {
    const metric: PerformanceMetric = {
      name: entry.name,
      value: entry.startTime,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userId: this.userId
    };

    this.performanceQueue.push(metric);
  }

  private async flushQueues(): Promise<void> {
    if (!this.isOnline) return;

    try {
      // Flush error queue
      if (this.errorQueue.length > 0) {
        const errorsToSend = this.errorQueue.splice(0, this.batchSize);
        await this.sendErrors(errorsToSend);
      }

      // Flush performance queue
      if (this.performanceQueue.length > 0) {
        const metricsToSend = this.performanceQueue.splice(0, this.batchSize);
        await this.sendPerformanceMetrics(metricsToSend);
      }
    } catch (error) {
      console.error('Failed to flush error queues:', error);
      // Re-add items to queue for retry
      this.errorQueue.unshift(...this.errorQueue.splice(0, this.batchSize));
    }
  }

  private async sendErrors(errors: ErrorReport[]): Promise<void> {
    // In production, send to your error monitoring service
    // For now, we'll just log them
    if (import.meta.env.PROD) {
      try {
        await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errors),
        });
      } catch (error) {
        console.error('Failed to send errors to server:', error);
      }
    }
  }

  private async sendPerformanceMetrics(metrics: PerformanceMetric[]): Promise<void> {
    // In production, send to your analytics service
    if (import.meta.env.PROD) {
      try {
        await fetch('/api/metrics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(metrics),
        });
      } catch (error) {
        console.error('Failed to send metrics to server:', error);
      }
    }
  }

  // Manual error capture for specific scenarios
  captureUserAction(action: string, context: Record<string, unknown> = {}): void {
    this.captureError(new Error(`User Action: ${action}`), {
      type: 'user_action',
      action,
      ...context
    });
  }

  captureSecurityEvent(event: string, context: Record<string, unknown> = {}): void {
    this.captureError(new Error(`Security Event: ${event}`), {
      type: 'security_event',
      event,
      severity: 'high',
      ...context
    });
  }

  // Get current session info
  getSessionInfo(): { sessionId: string; userId?: string } {
    return {
      sessionId: this.sessionId,
      userId: this.userId
    };
  }
}

// Create global instance
export const errorMonitor = new ErrorMonitor();

// Export convenience functions
export const captureError = (error: Error, context?: Record<string, unknown>) => {
  errorMonitor.captureError(error, context);
};

export const captureUserAction = (action: string, context?: Record<string, unknown>) => {
  errorMonitor.captureUserAction(action, context);
};

export const captureSecurityEvent = (event: string, context?: Record<string, unknown>) => {
  errorMonitor.captureSecurityEvent(event, context);
};

export const setUserId = (userId: string) => {
  errorMonitor.setUserId(userId);
}; 