import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  Moon,
  Sun,
  RefreshCw,
  Cog
} from 'lucide-react';
import { useDashboardStore } from '@/store';
import { cn } from '@/utils';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { settings, setSettings } = useDashboardStore();

  const navigation = [
    { name: '概览', href: '/', icon: LayoutDashboard },
    { name: '项目', href: '/projects', icon: FolderOpen },
    { name: '分析', href: '/analytics', icon: BarChart3 },
    { name: '配置', href: '/config', icon: Cog },
    { name: '设置', href: '/settings', icon: Settings },
  ];

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    setSettings({ theme: newTheme });
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 移动端侧边栏遮罩 */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-40 bg-card border-r border-border',
          'lg:translate-x-0 lg:static lg:inset-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-12 items-center justify-between px-3">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">V</span>
              </div>
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 space-y-1 px-2 py-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-2 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </motion.a>
              );
            })}
          </nav>

          {/* 底部操作 */}
          <div className="border-t border-border p-2 space-y-1">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center space-x-2 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {settings.theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>主题</span>
            </button>
            
            <button className="flex w-full items-center space-x-2 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>刷新</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 主内容区 */}
      <div className="lg:pl-40">
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1 rounded-md hover:bg-accent"
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="text-lg font-semibold">
              {navigation.find(item => item.href === location.pathname)?.name || '概览'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* 实时状态指示器 */}
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-muted-foreground">实时</span>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
