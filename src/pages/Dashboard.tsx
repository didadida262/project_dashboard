import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store';
import { ApiService } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  AlertTriangle,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { formatNumber, formatPercentage, getRelativeTime } from '@/utils';
import ProjectList from '@/components/ProjectList';
import AnalyticsChart from '@/components/AnalyticsChart';
import RealtimeStats from '@/components/RealtimeStats';

const Dashboard: React.FC = () => {
  const {
    projects,
    analyticsData,
    realtimeData,
    loading,
    error,
    setLoading,
    setError,
    setAnalyticsData,
    setRealtimeData
  } = useDashboardStore();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading('analytics', true);
        setLoading('realtime', true);

        // 模拟数据加载
        const mockAnalytics = generateMockAnalytics();
        const mockRealtime = generateMockRealtime();
        
        setAnalyticsData(mockAnalytics);
        setRealtimeData(mockRealtime);
      } catch (error) {
        console.error('加载仪表板数据失败:', error);
        setError('加载数据失败');
      } finally {
        setLoading('analytics', false);
        setLoading('realtime', false);
      }
    };

    loadDashboardData();
  }, [setLoading, setError, setAnalyticsData, setRealtimeData]);

  // 计算统计数据
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'READY').length;
  const totalPageViews = analyticsData.reduce((sum, data) => sum + data.pageViews, 0);
  const totalUniqueVisitors = analyticsData.reduce((sum, data) => sum + data.uniqueVisitors, 0);
  const avgResponseTime = realtimeData.reduce((sum, data) => sum + data.avgResponseTime, 0) / realtimeData.length || 0;
  const errorRate = realtimeData.reduce((sum, data) => sum + data.errors, 0) / realtimeData.length || 0;

  const stats = [
    {
      title: '总项目数',
      value: totalProjects,
      change: '+2',
      changeType: 'positive' as const,
      icon: Globe,
      description: '已部署的项目总数'
    },
    {
      title: '活跃项目',
      value: activeProjects,
      change: '+1',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: '正在运行的项目'
    },
    {
      title: '总访问量',
      value: formatNumber(totalPageViews),
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: Users,
      description: '过去7天的页面浏览量'
    },
    {
      title: '独立访客',
      value: formatNumber(totalUniqueVisitors),
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: Users,
      description: '过去7天的独立访客数'
    },
    {
      title: '平均响应时间',
      value: `${avgResponseTime.toFixed(0)}ms`,
      change: '-5.2%',
      changeType: 'positive' as const,
      icon: Clock,
      description: '所有项目的平均响应时间'
    },
    {
      title: '错误率',
      value: formatPercentage(errorRate),
      change: '-0.3%',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      description: '系统错误率'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">仪表板</h1>
          <p className="text-muted-foreground">
            监控您的Vercel项目性能和访问数据
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            导出报告
          </Button>
          <Button size="sm">
            刷新数据
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className={`${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">vs 昨天</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 实时统计 */}
      <RealtimeStats />

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>访问量趋势</CardTitle>
            <CardDescription>过去7天的页面访问量变化</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={analyticsData}
              type="line"
              height={300}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>项目状态分布</CardTitle>
            <CardDescription>各状态项目的数量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={projects}
              type="pie"
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* 项目列表 */}
      <Card>
        <CardHeader>
          <CardTitle>项目概览</CardTitle>
          <CardDescription>所有部署项目的详细信息和状态</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectList />
        </CardContent>
      </Card>
    </div>
  );
};

// 模拟数据生成函数
function generateMockAnalytics() {
  const data = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    data.push({
      projectId: 'mock-project',
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(Math.random() * 1000) + 500,
      uniqueVisitors: Math.floor(Math.random() * 500) + 200,
      bounceRate: Math.random() * 0.5 + 0.2,
      avgSessionDuration: Math.random() * 300 + 60,
      topPages: [
        { path: '/', views: Math.floor(Math.random() * 100) + 50 },
        { path: '/about', views: Math.floor(Math.random() * 50) + 20 },
        { path: '/contact', views: Math.floor(Math.random() * 30) + 10 }
      ],
      topCountries: [
        { country: 'US', views: Math.floor(Math.random() * 200) + 100 },
        { country: 'CN', views: Math.floor(Math.random() * 150) + 80 },
        { country: 'JP', views: Math.floor(Math.random() * 100) + 50 }
      ],
      topDevices: [
        { device: 'Desktop', views: Math.floor(Math.random() * 300) + 200 },
        { device: 'Mobile', views: Math.floor(Math.random() * 200) + 100 },
        { device: 'Tablet', views: Math.floor(Math.random() * 50) + 20 }
      ],
      topBrowsers: [
        { browser: 'Chrome', views: Math.floor(Math.random() * 400) + 300 },
        { browser: 'Firefox', views: Math.floor(Math.random() * 100) + 50 },
        { browser: 'Safari', views: Math.floor(Math.random() * 80) + 40 }
      ]
    });
  }
  
  return data;
}

function generateMockRealtime() {
  const data = [];
  const now = new Date();
  
  for (let i = 0; i < 10; i++) {
    const timestamp = new Date(now.getTime() - i * 60000); // 每分钟一个数据点
    
    data.push({
      projectId: 'mock-project',
      timestamp: timestamp.toISOString(),
      activeUsers: Math.floor(Math.random() * 50) + 10,
      pageViews: Math.floor(Math.random() * 100) + 20,
      errors: Math.floor(Math.random() * 5),
      avgResponseTime: Math.random() * 200 + 100
    });
  }
  
  return data;
}

export default Dashboard;
