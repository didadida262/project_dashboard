import React, { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const { settings, setSettings } = useDashboardStore();

  // 检测屏幕尺寸
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <motion.div
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{ x: sidebarOpen ? 0 : (isMobile ? -300 : 0) }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-card border-r border-border',
          // 移动端：全宽侧边栏
          isMobile ? 'w-80' : 'w-64',
          // 桌面端：静态显示
          !isMobile && 'lg:translate-x-0 lg:static lg:inset-0',
          // 移动端：条件显示
          isMobile && (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-12 items-center justify-between px-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <span className="text-base font-semibold">Vercel Dashboard</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* 导航菜单 */}
          <nav className="flex-1 space-y-1 px-3 py-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </motion.a>
              );
            })}
          </nav>

          {/* 底部操作 */}
          <div className="border-t border-border p-1 space-y-0.5">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center space-x-1 rounded px-1 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {settings.theme === 'dark' ? (
                <Sun className="h-3 w-3" />
              ) : (
                <Moon className="h-3 w-3" />
              )}
              <span>主题</span>
            </button>
            
            <button className="flex w-full items-center space-x-1 rounded px-1 py-1 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
              <RefreshCw className="h-3 w-3" />
              <span>刷新</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 主内容区 */}
      <div className={cn(
        // 桌面端：有左边距
        !isMobile && 'lg:pl-64',
        // 移动端：无左边距
        isMobile && 'w-full'
      )}>
        {/* 顶部导航栏 */}
        <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSidebarOpen(true)}
              className={cn(
                'p-1 rounded-md hover:bg-accent',
                // 移动端：显示菜单按钮
                isMobile ? 'block' : 'lg:hidden'
              )}
            >
              <Menu className="h-4 w-4" />
            </button>
            <h1 className={cn(
              'font-semibold',
              // 移动端：较小字体
              isMobile ? 'text-base' : 'text-lg'
            )}>
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
        <main className="flex-1 min-h-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
