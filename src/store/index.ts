import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { VercelProject, AnalyticsData, PerformanceData, FilterOptions, RealtimeData, UserSettings } from '@/types';

interface DashboardState {
  // 项目数据
  projects: VercelProject[];
  selectedProjects: string[];
  
  // 分析数据
  analyticsData: AnalyticsData[];
  performanceData: PerformanceData[];
  realtimeData: RealtimeData[];
  
  // 筛选条件
  filters: FilterOptions;
  
  // 用户设置
  settings: UserSettings;
  
  // 加载状态
  loading: {
    projects: boolean;
    analytics: boolean;
    performance: boolean;
    realtime: boolean;
  };
  
  // 错误状态
  error: string | null;
  
  // Actions
  setProjects: (projects: VercelProject[]) => void;
  setSelectedProjects: (projectIds: string[]) => void;
  setAnalyticsData: (data: AnalyticsData[]) => void;
  setPerformanceData: (data: PerformanceData[]) => void;
  setRealtimeData: (data: RealtimeData[]) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  setSettings: (settings: Partial<UserSettings>) => void;
  setLoading: (key: keyof DashboardState['loading'], loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // 计算属性
  getFilteredProjects: () => VercelProject[];
  getFilteredAnalytics: () => AnalyticsData[];
  getFilteredPerformance: () => PerformanceData[];
}

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set, get) => ({
      // 初始状态
      projects: [],
      selectedProjects: [],
      analyticsData: [],
      performanceData: [],
      realtimeData: [],
      filters: {
        timeRange: '7days',
        projects: [],
        metrics: ['pageViews', 'uniqueVisitors', 'avgResponseTime']
      },
      settings: {
        theme: 'dark',
        refreshInterval: 30,
        notifications: true,
        autoRefresh: true
      },
      loading: {
        projects: false,
        analytics: false,
        performance: false,
        realtime: false
      },
      error: null,
      
      // Actions
      setProjects: (projects) => set({ projects }),
      setSelectedProjects: (selectedProjects) => set({ selectedProjects }),
      setAnalyticsData: (analyticsData) => set({ analyticsData }),
      setPerformanceData: (performanceData) => set({ performanceData }),
      setRealtimeData: (realtimeData) => set({ realtimeData }),
      setFilters: (filters) => set((state) => ({ 
        filters: { ...state.filters, ...filters } 
      })),
      setSettings: (settings) => set((state) => ({ 
        settings: { ...state.settings, ...settings } 
      })),
      setLoading: (key, loading) => set((state) => ({
        loading: { ...state.loading, [key]: loading }
      })),
      setError: (error) => set({ error }),
      
      // 计算属性
      getFilteredProjects: () => {
        const { projects, selectedProjects } = get();
        if (selectedProjects.length === 0) return projects;
        return projects.filter(project => selectedProjects.includes(project.id));
      },
      
      getFilteredAnalytics: () => {
        const { analyticsData, filters } = get();
        return analyticsData.filter(data => {
          if (filters.projects.length > 0 && !filters.projects.includes(data.projectId)) {
            return false;
          }
          // 这里可以添加时间范围过滤逻辑
          return true;
        });
      },
      
      getFilteredPerformance: () => {
        const { performanceData, filters } = get();
        return performanceData.filter(data => {
          if (filters.projects.length > 0 && !filters.projects.includes(data.projectId)) {
            return false;
          }
          return true;
        });
      }
    }),
    {
      name: 'dashboard-store',
    }
  )
);
