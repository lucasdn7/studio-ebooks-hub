// Environment configuration for security and optimization

interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  apiUrl: string;
  supabaseUrl: string;
  supabaseKey: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  rateLimitAttempts: number;
  rateLimitWindow: number;
  sessionTimeout: number;
  enableAnalytics: boolean;
  enableDebug: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  const mode = import.meta.env.MODE;
  
  return {
    isDevelopment: mode === 'development',
    isProduction: mode === 'production',
    isTest: mode === 'test',
    
    // API Configuration
    apiUrl: import.meta.env.VITE_API_URL || 'https://api.studioebooks.com',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://hnlbvgnnfdewyawnoevm.supabase.co',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubGJ2Z25uZmRld3lhd25vZXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MzIwNTcsImV4cCI6MjA2NDIwODA1N30.vWEy91tFO8kd_7C9SMj5PLAclAKHXjg5Nn5xbsMSAA8',
    
    // File Upload Configuration
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '10485760'), // 10MB
    allowedFileTypes: (import.meta.env.VITE_ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp,application/pdf').split(','),
    
    // Rate Limiting Configuration
    rateLimitAttempts: parseInt(import.meta.env.VITE_RATE_LIMIT_ATTEMPTS || '5'),
    rateLimitWindow: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW || '300000'), // 5 minutes
    
    // Session Configuration
    sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '3600000'), // 1 hour
    
    // Feature Flags
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true' || mode === 'development'
  };
};

export const config = getEnvironmentConfig();

// Security validation
export const validateConfig = (): void => {
  if (!config.supabaseUrl || !config.supabaseKey) {
    throw new Error('Supabase configuration is missing');
  }
  
  if (config.isProduction && config.enableDebug) {
    console.warn('Debug mode is enabled in production');
  }
};

// Environment-specific utilities
export const isSecureContext = (): boolean => {
  return window.isSecureContext || config.isDevelopment;
};

export const getSecureHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };

  if (config.isProduction) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains';
    headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';";
  }

  return headers;
};

// Feature flags
export const features = {
  analytics: config.enableAnalytics,
  debug: config.enableDebug,
  fileUpload: true,
  realTimeUpdates: true,
  offlineSupport: false,
  pushNotifications: false
} as const;

// Performance configuration
export const performanceConfig = {
  imageOptimization: true,
  lazyLoading: true,
  codeSplitting: true,
  caching: {
    enabled: true,
    maxAge: 5 * 60 * 1000, // 5 minutes
    staleWhileRevalidate: 60 * 1000 // 1 minute
  }
} as const; 