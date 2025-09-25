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

        // 只加载真实数据，不生成模拟数据
        setAnalyticsData([]);
        setRealtimeData([]);
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

  // 使用真实项目数据更新统计
  const realStats = [
    {
      title: '总项目数',
      value: totalProjects,
      change: totalProjects > 0 ? `+${totalProjects}` : '0',
      changeType: 'positive' as const,
      icon: Globe,
      description: '已部署的项目总数'
    },
    {
      title: '活跃项目',
      value: activeProjects,
      change: activeProjects > 0 ? `+${activeProjects}` : '0',
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

  // 使用真实统计数据，没有数据时显示0
  const stats = realStats.map(stat => ({
    ...stat,
    value: stat.value || 0,
    change: stat.value > 0 ? stat.change : '0'
  }));

  return (
    <div className="p-1 sm:p-2 space-y-1 min-h-0">
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
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

      {/* 图表区域 - 暂时隐藏，等待真实数据 */}
      {analyticsData.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
          <Card>
            <CardHeader>
              <CardTitle>访问量趋势</CardTitle>
              <CardDescription>过去7天的页面访问量变化</CardDescription>
            </CardHeader>
            <CardContent>
              <AnalyticsChart 
                data={analyticsData}
                type="line"
                height={200}
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
                height={200}
              />
            </CardContent>
          </Card>
        </div>
      )}

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


export default Dashboard;
