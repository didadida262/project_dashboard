import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import dayjs from 'dayjs';

// 合并CSS类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化数字
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// 格式化百分比
export function formatPercentage(num: number): string {
  return (num * 100).toFixed(1) + '%';
}

// 格式化时间
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return seconds.toFixed(1) + 's';
  }
  if (seconds < 3600) {
    return (seconds / 60).toFixed(1) + 'm';
  }
  return (seconds / 3600).toFixed(1) + 'h';
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 获取相对时间
export function getRelativeTime(date: string): string {
  return dayjs(date).fromNow();
}

// 获取时间范围
export function getTimeRange(timeRange: string): { start: string; end: string } {
  const now = dayjs();
  const end = now.format('YYYY-MM-DD');
  
  switch (timeRange) {
    case 'today':
      return { start: now.format('YYYY-MM-DD'), end };
    case 'yesterday':
      const yesterday = now.subtract(1, 'day');
      return { start: yesterday.format('YYYY-MM-DD'), end: yesterday.format('YYYY-MM-DD') };
    case '7days':
      return { start: now.subtract(7, 'day').format('YYYY-MM-DD'), end };
    case '30days':
      return { start: now.subtract(30, 'day').format('YYYY-MM-DD'), end };
    default:
      return { start: now.subtract(7, 'day').format('YYYY-MM-DD'), end };
  }
}

// 生成随机颜色
export function getRandomColor(): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 深拷贝
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (typeof obj === 'object') {
    const clonedObj = {} as any;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

// 生成UUID
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 验证邮箱
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 验证URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// 获取浏览器信息
export function getBrowserInfo() {
  const userAgent = navigator.userAgent;
  const browsers = {
    Chrome: /Chrome/,
    Firefox: /Firefox/,
    Safari: /Safari/,
    Edge: /Edge/,
    Opera: /Opera/
  };
  
  for (const [name, regex] of Object.entries(browsers)) {
    if (regex.test(userAgent)) {
      return name;
    }
  }
  return 'Unknown';
}

// 获取操作系统信息
export function getOSInfo() {
  const userAgent = navigator.userAgent;
  const os = {
    Windows: /Windows/,
    MacOS: /Mac OS/,
    Linux: /Linux/,
    Android: /Android/,
    iOS: /iPhone|iPad|iPod/
  };
  
  for (const [name, regex] of Object.entries(os)) {
    if (regex.test(userAgent)) {
      return name;
    }
  }
  return 'Unknown';
}
