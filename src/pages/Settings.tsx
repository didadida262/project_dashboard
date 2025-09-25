import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Settings as SettingsIcon,
  Key,
  Bell,
  Palette,
  RefreshCw,
  Download,
  Trash2
} from 'lucide-react';

const Settings: React.FC = () => {
  const { settings, setSettings } = useDashboardStore();

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings({ theme });
    document.documentElement.classList.toggle('dark', theme === 'dark');
  };

  const handleRefreshIntervalChange = (interval: number) => {
    setSettings({ refreshInterval: interval });
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setSettings({ notifications: enabled });
  };

  const handleAutoRefreshToggle = (enabled: boolean) => {
    setSettings({ autoRefresh: enabled });
  };

  return (
    <div className="p-2 space-y-3">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">设置</h1>
        <p className="text-muted-foreground">
          管理您的账户设置和偏好
        </p>
      </div>

      {/* 主题设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>主题设置</span>
          </CardTitle>
          <CardDescription>
            选择您喜欢的界面主题
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Button
              variant={settings.theme === 'light' ? 'default' : 'outline'}
              onClick={() => handleThemeChange('light')}
            >
              浅色主题
            </Button>
            <Button
              variant={settings.theme === 'dark' ? 'default' : 'outline'}
              onClick={() => handleThemeChange('dark')}
            >
              深色主题
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 数据刷新设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>数据刷新</span>
          </CardTitle>
          <CardDescription>
            配置数据的自动刷新频率
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">自动刷新</label>
              <p className="text-sm text-muted-foreground">
                启用后系统将自动刷新数据
              </p>
            </div>
            <Button
              variant={settings.autoRefresh ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleAutoRefreshToggle(!settings.autoRefresh)}
            >
              {settings.autoRefresh ? '已启用' : '已禁用'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">刷新间隔</label>
            <div className="flex space-x-2">
              {[15, 30, 60, 120].map((interval) => (
                <Button
                  key={interval}
                  variant={settings.refreshInterval === interval ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleRefreshIntervalChange(interval)}
                >
                  {interval}秒
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 通知设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>通知设置</span>
          </CardTitle>
          <CardDescription>
            管理您接收的通知类型
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">系统通知</label>
              <p className="text-sm text-muted-foreground">
                接收系统状态和错误通知
              </p>
            </div>
            <Button
              variant={settings.notifications ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleNotificationToggle(!settings.notifications)}
            >
              {settings.notifications ? '已启用' : '已禁用'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vercel连接设置 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5" />
            <span>Vercel连接</span>
          </CardTitle>
          <CardDescription>
            管理您的Vercel API连接
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">API Token</label>
              <p className="text-sm text-muted-foreground">
                用于访问Vercel API的认证令牌
              </p>
            </div>
            <Button variant="outline" size="sm">
              重新连接
            </Button>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              当前状态: <span className="text-green-600">已连接</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              最后更新: 2分钟前
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 数据管理 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>数据管理</span>
          </CardTitle>
          <CardDescription>
            导出或清理您的数据
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">导出数据</label>
              <p className="text-sm text-muted-foreground">
                下载您的所有项目数据
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">清理缓存</label>
              <p className="text-sm text-muted-foreground">
                清除本地缓存数据
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              清理
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 关于 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="h-5 w-5" />
            <span>关于</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              版本: 1.0.0
            </p>
            <p className="text-sm text-muted-foreground">
              构建时间: 2024-01-01
            </p>
            <p className="text-sm text-muted-foreground">
              技术支持: support@example.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
