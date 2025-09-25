import React from 'react';
import { motion } from 'framer-motion';
import { useDashboardStore } from '@/store';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  ExternalLink, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';
import { formatNumber, getRelativeTime } from '@/utils';

const ProjectList: React.FC = () => {
  const { projects, loading } = useDashboardStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'READY':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'ERROR':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'BUILDING':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'QUEUED':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'READY':
        return '运行中';
      case 'ERROR':
        return '错误';
      case 'BUILDING':
        return '构建中';
      case 'QUEUED':
        return '排队中';
      default:
        return '未知';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'READY':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'ERROR':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'BUILDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'QUEUED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading.projects) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        <span className="ml-2 text-muted-foreground">加载中...</span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">暂无项目数据</p>
        <Button className="mt-4" size="sm">
          连接Vercel
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {getStatusIcon(project.status)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium truncate">
                  {project.name}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-sm text-muted-foreground">
                  {project.framework}
                </p>
                <p className="text-sm text-muted-foreground">
                  健康度: {project.healthScore}%
                </p>
                <p className="text-sm text-muted-foreground">
                  更新于 {getRelativeTime(project.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(project.url, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              访问
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList;
