import axios from 'axios';
import { VercelProject, AnalyticsData, PerformanceData, RealtimeData, ApiResponse } from '@/types';

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    const token = localStorage.getItem('vercel_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // 处理认证失败
      localStorage.removeItem('vercel_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API服务类
export class ApiService {
  // 获取Vercel项目列表
  static async getProjects(): Promise<VercelProject[]> {
    try {
      const response = await api.get<ApiResponse<VercelProject[]>>('/projects');
      return response.data.data;
    } catch (error) {
      console.error('获取项目列表失败:', error);
      throw error;
    }
  }

  // 获取项目分析数据
  static async getAnalytics(projectId: string, timeRange: string): Promise<AnalyticsData[]> {
    try {
      const response = await api.get<ApiResponse<AnalyticsData[]>>(
        `/analytics/${projectId}?timeRange=${timeRange}`
      );
      return response.data.data;
    } catch (error) {
      console.error('获取分析数据失败:', error);
      throw error;
    }
  }

  // 获取项目性能数据
  static async getPerformance(projectId: string, timeRange: string): Promise<PerformanceData[]> {
    try {
      const response = await api.get<ApiResponse<PerformanceData[]>>(
        `/performance/${projectId}?timeRange=${timeRange}`
      );
      return response.data.data;
    } catch (error) {
      console.error('获取性能数据失败:', error);
      throw error;
    }
  }

  // 获取实时数据
  static async getRealtimeData(projectId: string): Promise<RealtimeData[]> {
    try {
      const response = await api.get<ApiResponse<RealtimeData[]>>(`/realtime/${projectId}`);
      return response.data.data;
    } catch (error) {
      console.error('获取实时数据失败:', error);
      throw error;
    }
  }

  // 批量获取多个项目的数据
  static async getBatchAnalytics(projectIds: string[], timeRange: string): Promise<AnalyticsData[]> {
    try {
      const response = await api.post<ApiResponse<AnalyticsData[]>>('/analytics/batch', {
        projectIds,
        timeRange
      });
      return response.data.data;
    } catch (error) {
      console.error('批量获取分析数据失败:', error);
      throw error;
    }
  }

  // 设置Vercel API Token
  static async setVercelToken(token: string): Promise<boolean> {
    try {
      const response = await api.post<ApiResponse<boolean>>('/auth/vercel', { token });
      if (response.data.success) {
        localStorage.setItem('vercel_token', token);
      }
      return response.data.success;
    } catch (error) {
      console.error('设置Vercel Token失败:', error);
      throw error;
    }
  }

  // 验证Token有效性
  static async validateToken(): Promise<boolean> {
    try {
      const response = await api.get<ApiResponse<boolean>>('/auth/validate');
      return response.data.data;
    } catch (error) {
      console.error('验证Token失败:', error);
      return false;
    }
  }
}

export default api;
