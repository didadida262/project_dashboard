import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Users, 
  Eye, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react';
import { formatNumber } from '@/utils';

const RealtimeStats: React.FC = () => {
  const { realtimeData } = useDashboardStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 计算实时统计数据，没有数据时显示0
  const totalActiveUsers = realtimeData.length > 0 ? realtimeData.reduce((sum, data) => sum + data.activeUsers, 0) : 0;
  const totalPageViews = realtimeData.length > 0 ? realtimeData.reduce((sum, data) => sum + data.pageViews, 0) : 0;
  const totalErrors = realtimeData.length > 0 ? realtimeData.reduce((sum, data) => sum + data.errors, 0) : 0;
  const avgResponseTime = realtimeData.length > 0 ? realtimeData.reduce((sum, data) => sum + data.avgResponseTime, 0) / realtimeData.length : 0;

  const stats = [
    {
      title: '在线用户',
      value: totalActiveUsers,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      change: '+12'
    },
    {
      title: '页面浏览',
      value: totalPageViews,
      icon: Eye,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      change: '+8'
    },
    {
      title: '错误数量',
      value: totalErrors,
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      change: '-2'
    },
    {
      title: '响应时间',
      value: `${avgResponseTime.toFixed(0)}ms`,
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      change: '-15ms'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>实时监控</span>
            </CardTitle>
            <CardDescription>
              当前时间: {currentTime.toLocaleTimeString()}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">实时</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="relative"
            >
              <div className={`p-4 rounded-lg ${stat.bgColor} border`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">
                      {typeof stat.value === 'number' ? formatNumber(stat.value) : stat.value}
                    </p>
                  </div>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-2 flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">
                    {stat.change}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    过去5分钟
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 实时数据流 */}
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-3">实时数据流</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {realtimeData.length > 0 ? (
              realtimeData.slice(0, 5).map((data, index) => (
                <motion.div
                  key={data.timestamp}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 bg-muted rounded-lg text-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>{new Date(data.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{data.activeUsers} 用户</span>
                    <span>{data.pageViews} 浏览</span>
                    <span>{data.errors} 错误</span>
                    <span>{data.avgResponseTime.toFixed(0)}ms</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-2 text-muted-foreground">
                <p className="text-sm">暂无实时数据</p>
                <p className="text-xs">请确保项目已连接并正常运行</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealtimeStats;
