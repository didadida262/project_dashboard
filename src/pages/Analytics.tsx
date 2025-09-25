import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Calendar,
  Filter,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Smartphone
} from 'lucide-react';
import { formatNumber, formatPercentage } from '@/utils';
import AnalyticsChart from '@/components/AnalyticsChart';

const Analytics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('pageViews');
  const [timeRange, setTimeRange] = useState('7days');

  // 模拟分析数据
  const analyticsData = [
    {
      date: '2024-01-01',
      pageViews: 1250,
      uniqueVisitors: 450,
      bounceRate: 0.35,
      avgSessionDuration: 180,
      topPages: [
        { path: '/', views: 800 },
        { path: '/about', views: 200 },
        { path: '/contact', views: 150 }
      ],
      topCountries: [
        { country: 'US', views: 600 },
        { country: 'CN', views: 400 },
        { country: 'JP', views: 250 }
      ],
      topDevices: [
        { device: 'Desktop', views: 800 },
        { device: 'Mobile', views: 350 },
        { device: 'Tablet', views: 100 }
      ]
    },
    // 更多模拟数据...
  ];

  const metrics = [
    { key: 'pageViews', label: '页面浏览量', icon: BarChart3, color: 'text-blue-500' },
    { key: 'uniqueVisitors', label: '独立访客', icon: Users, color: 'text-green-500' },
    { key: 'bounceRate', label: '跳出率', icon: TrendingUp, color: 'text-red-500' },
    { key: 'avgSessionDuration', label: '平均会话时长', icon: Globe, color: 'text-purple-500' }
  ];

  const timeRanges = [
    { key: 'today', label: '今天' },
    { key: 'yesterday', label: '昨天' },
    { key: '7days', label: '近7天' },
    { key: '30days', label: '近30天' },
    { key: 'custom', label: '自定义' }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* 页面标题 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">数据分析</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            深入了解您的项目访问数据和用户行为
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs sm:text-sm">
            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">导出数据</span>
            <span className="sm:hidden">导出</span>
          </Button>
          <Button size="sm" className="text-xs sm:text-sm">
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">筛选</span>
          </Button>
        </div>
      </div>

      {/* 筛选器 */}
      <Card>
        <CardHeader>
          <CardTitle>数据筛选</CardTitle>
          <CardDescription>选择要查看的时间范围和指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {/* 时间范围选择 */}
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">时间范围:</span>
              <div className="flex space-x-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range.key}
                    variant={timeRange === range.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(range.key)}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 指标选择 */}
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">指标:</span>
              <div className="flex space-x-1">
                {metrics.map((metric) => (
                  <Button
                    key={metric.key}
                    variant={selectedMetric === metric.key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMetric(metric.key)}
                  >
                    <metric.icon className={`h-4 w-4 mr-1 ${metric.color}`} />
                    {metric.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 关键指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.key === 'bounceRate' 
                    ? formatPercentage(0.35)
                    : metric.key === 'avgSessionDuration'
                    ? '3:45'
                    : formatNumber(1250)
                  }
                </div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-muted-foreground">vs 昨天</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* 访问量趋势图 */}
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

        {/* 设备分布图 */}
        <Card>
          <CardHeader>
            <CardTitle>设备分布</CardTitle>
            <CardDescription>用户使用的设备类型统计</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={analyticsData[0]?.topDevices || []}
              type="pie"
              height={300}
            />
          </CardContent>
        </Card>

        {/* 地理位置分布图 */}
        <Card>
          <CardHeader>
            <CardTitle>地理位置分布</CardTitle>
            <CardDescription>用户访问的地理位置统计</CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsChart 
              data={analyticsData[0]?.topCountries || []}
              type="bar"
              height={300}
            />
          </CardContent>
        </Card>

        {/* 页面访问排行 */}
        <Card>
          <CardHeader>
            <CardTitle>热门页面</CardTitle>
            <CardDescription>访问量最高的页面排行</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData[0]?.topPages?.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{page.path}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {formatNumber(page.views)} 次访问
                    </span>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(page.views / 800) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
