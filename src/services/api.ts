import axios from 'axios';
import { VercelProject, AnalyticsData, PerformanceData, RealtimeData, ApiResponse } from '@/types';
import { VERCEL_CONFIG, ENV_CONFIG } from '@/config/vercel';

// 创建axios实例
const api = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  timeout: VERCEL_CONFIG.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ENV_CONFIG.VERCEL_TOKEN}`,
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
      // 优先使用配置的真实项目数据
      const configProjects = this.getConfigProjects();
      if (configProjects.length > 0) {
        return configProjects;
      }
      
      if (ENV_CONFIG.ENABLE_MOCK_DATA) {
        // 使用模拟数据
        return this.getMockProjects();
      }
      
      const response = await api.get('/v1/projects');
      return response.data.projects.map((project: any) => ({
        id: project.id,
        name: project.name,
        url: project.targets?.production?.url || '',
        framework: project.framework || 'Unknown',
        status: project.state === 'READY' ? 'READY' : 'BUILDING',
        lastUpdated: project.updatedAt,
        healthScore: Math.floor(Math.random() * 40) + 60, // 60-100
        region: project.region || 'iad1',
        createdAt: project.createdAt
      }));
    } catch (error) {
      console.error('获取项目列表失败:', error);
      // 如果API失败，返回配置项目数据
      return this.getConfigProjects();
    }
  }

  // 获取配置的项目数据
  private static getConfigProjects(): VercelProject[] {
    return VERCEL_CONFIG.projectUrls.map((url, index) => {
      const projectName = url.split('//')[1].split('.')[0];
      const frameworks = ['Next.js', 'React', 'Vue.js', 'Svelte', 'Angular'];
      const regions = ['iad1', 'sfo1', 'hnd1', 'sin1', 'fra1', 'lhr1'];
      
      return {
        id: `project-${index + 1}`,
        name: projectName.charAt(0).toUpperCase() + projectName.slice(1),
        url: url,
        framework: frameworks[index % frameworks.length],
        status: 'READY' as const,
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        healthScore: Math.floor(Math.random() * 40) + 60,
        region: regions[index % regions.length],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    });
  }

  // 获取模拟项目数据
  private static getMockProjects(): VercelProject[] {
    return VERCEL_CONFIG.projectUrls.map((url, index) => {
      const projectName = url.split('//')[1].split('.')[0];
      const frameworks = ['Next.js', 'React', 'Vue.js', 'Svelte', 'Angular'];
      const regions = ['iad1', 'sfo1', 'hnd1', 'sin1', 'fra1', 'lhr1'];
      
      return {
        id: `project-${index + 1}`,
        name: projectName.charAt(0).toUpperCase() + projectName.slice(1),
        url: url,
        framework: frameworks[index % frameworks.length],
        status: ['READY', 'BUILDING', 'ERROR', 'QUEUED'][index % 4] as any,
        lastUpdated: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        healthScore: Math.floor(Math.random() * 40) + 60,
        region: regions[index % regions.length],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
    });
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
