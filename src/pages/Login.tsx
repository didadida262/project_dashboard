import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Key, ExternalLink, CheckCircle } from 'lucide-react';
import { ApiService } from '@/services/api';

const Login: React.FC = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('请输入Vercel API Token');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const success = await ApiService.setVercelToken(token);
      if (success) {
        navigate('/');
      } else {
        setError('Token验证失败，请检查是否正确');
      }
    } catch (error) {
      console.error('连接失败:', error);
      setError('连接失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Key className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">连接Vercel</CardTitle>
            <CardDescription>
              输入您的Vercel API Token以开始监控您的项目
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="token" className="text-sm font-medium">
                  Vercel API Token
                </label>
                <input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="输入您的Vercel API Token"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  disabled={loading}
                />
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading}
              >
                {loading ? '连接中...' : '连接'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="text-sm font-medium mb-2">如何获取API Token？</h3>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. 访问 <a href="https://vercel.com/account/tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                  Vercel Tokens页面 <ExternalLink className="h-3 w-3 ml-1" />
                </a></li>
                <li>2. 点击 "Create Token" 按钮</li>
                <li>3. 输入Token名称并选择权限</li>
                <li>4. 复制生成的Token并粘贴到上方输入框</li>
              </ol>
            </div>

            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800 dark:text-green-200">
                  您的Token将安全存储在本地，不会发送到任何服务器
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
