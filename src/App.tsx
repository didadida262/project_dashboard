import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store';
import { ApiService } from '@/services/api';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Projects from '@/pages/Projects';
import Analytics from '@/pages/Analytics';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';
import { Toaster } from '@/components/ui/Toaster';

function App() {
  const { setLoading, setError, setProjects } = useDashboardStore();

  useEffect(() => {
    // 初始化应用
    const initializeApp = async () => {
      try {
        setLoading('projects', true);
        
        // 检查是否有保存的token
        const token = localStorage.getItem('vercel_token');
        if (token) {
          const isValid = await ApiService.validateToken();
          if (isValid) {
            // 获取项目列表
            const projects = await ApiService.getProjects();
            setProjects(projects);
          } else {
            localStorage.removeItem('vercel_token');
          }
        }
      } catch (error) {
        console.error('初始化应用失败:', error);
        setError('初始化应用失败，请检查网络连接');
      } finally {
        setLoading('projects', false);
      }
    };

    initializeApp();
  }, [setLoading, setError, setProjects]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
        <Toaster />
      </motion.div>
    </div>
  );
}

export default App;
