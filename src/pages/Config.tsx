import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  Settings as SettingsIcon,
  Plus,
  Trash2,
  ExternalLink,
  Save
} from 'lucide-react';

interface ProjectConfig {
  id: string;
  url: string;
}

const Config: React.FC = () => {
  const [projects, setProjects] = useState<ProjectConfig[]>([
    {
      id: 'project-1',
      url: 'https://my-portfolio.vercel.app'
    }
  ]);

  const [newProjectUrl, setNewProjectUrl] = useState('');

  const addProject = () => {
    if (newProjectUrl.trim()) {
      const project: ProjectConfig = {
        id: `project-${Date.now()}`,
        url: newProjectUrl.trim()
      };
      setProjects([...projects, project]);
      setNewProjectUrl('');
    }
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const saveConfig = () => {
    // 这里可以保存配置到本地存储或发送到服务器
    localStorage.setItem('vercel_projects', JSON.stringify(projects));
    console.log('配置已保存:', projects);
  };

  return (
    <div className="p-2 space-y-3">
      {/* 页面标题 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">项目配置</h1>
        <p className="text-muted-foreground">
          配置您要监控的Vercel项目信息
        </p>
      </div>

      {/* 添加新项目 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>添加新项目</span>
          </CardTitle>
          <CardDescription>
            输入您的Vercel项目信息
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Vercel项目URL</label>
            <input
              type="url"
              value={newProjectUrl}
              onChange={(e) => setNewProjectUrl(e.target.value)}
              placeholder="https://your-project.vercel.app"
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">
              只需要输入您的Vercel项目地址，系统会自动获取项目信息
            </p>
          </div>
          <Button onClick={addProject} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            添加项目
          </Button>
        </CardContent>
      </Card>

      {/* 项目列表 */}
      <Card>
        <CardHeader>
          <CardTitle>已配置的项目</CardTitle>
          <CardDescription>
            管理您的Vercel项目列表
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">
                      {project.url.split('//')[1].split('.')[0].charAt(0).toUpperCase() + 
                       project.url.split('//')[1].split('.')[0].slice(1)}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>{project.url}</span>
                    </a>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 保存按钮 */}
      <div className="flex justify-end">
        <Button onClick={saveConfig} size="lg">
          <Save className="h-4 w-4 mr-2" />
          保存配置
        </Button>
      </div>
    </div>
  );
};

export default Config;
