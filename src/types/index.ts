// 项目相关类型
export interface VercelProject {
  id: string;
  name: string;
  url: string;
  framework: string;
  status: 'READY' | 'BUILDING' | 'ERROR' | 'QUEUED';
  lastUpdated: string;
  healthScore: number;
  region: string;
  createdAt: string;
}

// 分析数据类型
export interface AnalyticsData {
  projectId: string;
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  topCountries: Array<{
    country: string;
    views: number;
  }>;
  topDevices: Array<{
    device: string;
    views: number;
  }>;
  topBrowsers: Array<{
    browser: string;
    views: number;
  }>;
}

// 性能数据类型
export interface PerformanceData {
  projectId: string;
  date: string;
  avgResponseTime: number;
  p95ResponseTime: number;
  errorRate: number;
  uptime: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
}

// 筛选条件类型
export interface FilterOptions {
  timeRange: 'today' | 'yesterday' | '7days' | '30days' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  projects: string[]; // 项目ID数组
  metrics: string[]; // 指标类型数组
}

// 图表数据类型
export interface ChartData {
  name: string;
  value: number;
  date?: string;
  [key: string]: any;
}

// 实时数据类型
export interface RealtimeData {
  projectId: string;
  timestamp: string;
  activeUsers: number;
  pageViews: number;
  errors: number;
  avgResponseTime: number;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 主题类型
export type Theme = 'light' | 'dark';

// 用户设置类型
export interface UserSettings {
  theme: Theme;
  refreshInterval: number; // 刷新间隔（秒）
  notifications: boolean;
  autoRefresh: boolean;
}
