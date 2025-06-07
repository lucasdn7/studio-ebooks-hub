
// Input sanitization utility functions
export const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length
};

export const sanitizeEmail = (email: string): string => {
  if (typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/[^\w@.-]/g, '') // Only allow word chars, @, dots, and hyphens
    .substring(0, 254); // Email length limit
};

export const sanitizePrice = (price: number | string): number | null => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (isNaN(numPrice) || numPrice < 0 || numPrice > 10000) {
    return null;
  }
  
  return Math.round(numPrice * 100) / 100; // Round to 2 decimal places
};

export const sanitizeCategory = (category: string): string => {
  const allowedCategories = [
    'arquitetura', 'paisagismo', 'urbanismo', 'design-interiores',
    'marcenaria', 'engenharia-civil', 'eletrica', 'hidrossanitario',
    'legislacao', 'tecnologia', 'marketing', 'financas',
    'desenvolvimento-pessoal', 'educacao', 'negocios'
  ];
  
  const sanitized = sanitizeString(category).toLowerCase();
  return allowedCategories.includes(sanitized) ? sanitized : 'arquitetura';
};

export const sanitizeFileUrl = (url: string): string => {
  if (typeof url !== 'string') return '';
  
  return url
    .replace(/\.\./g, '') // Prevent path traversal
    .replace(/[<>:"|?*]/g, '') // Remove potentially dangerous characters
    .trim();
};

export const validateImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Allow data URLs, HTTPS URLs, and relative paths
  const validPatterns = [
    /^data:image\/(jpeg|jpg|png|gif|webp);base64,/,
    /^https:\/\/[^\s<>]+\.(jpg|jpeg|png|gif|webp)$/i,
    /^\/[^\s<>]*\.(jpg|jpeg|png|gif|webp)$/i
  ];
  
  return validPatterns.some(pattern => pattern.test(url));
};
