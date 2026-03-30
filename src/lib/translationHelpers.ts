// Meridian Growth Advisory - Translation Keys Helper

// Flatten translation object to get all keys
export function flattenTranslations(obj: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'string') {
      result[newKey] = value;
    } else if (Array.isArray(value)) {
      // Skip arrays (like ticker keywords)
      continue;
    } else if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenTranslations(value, newKey));
    }
  }
  
  return result;
}

// Get translation value by path
export function getTranslationByPath(obj: any, path: string): string {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return '';
    }
  }
  
  return typeof current === 'string' ? current : '';
}

// Group translation keys by category
export function groupTranslationKeys(keys: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  
  for (const key of keys) {
    const category = key.split('.')[0];
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(key);
  }
  
  return groups;
}

// Get human-readable label for translation key
export function getKeyLabel(key: string): string {
  const parts = key.split('.');
  const lastPart = parts[parts.length - 1];
  
  // Convert camelCase to Title Case
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Get category label
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    nav: 'Navigation',
    hero: 'Hero Section',
    outcomes: 'Outcomes Section',
    industries: 'Industries Section',
    services: 'Services Page',
    about: 'About Page',
    contact: 'Contact Page',
    cta: 'Call to Action',
    footer: 'Footer',
    ticker: 'Ticker Banner',
    admin: 'Admin Panel',
  };
  
  return labels[category] || category.charAt(0).toUpperCase() + category.slice(1);
}
