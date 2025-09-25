// Vercel配置
export const VERCEL_CONFIG = {
  // 您的Vercel项目配置
  projects: [
    {
      id: 'project-1',
      name: 'My Portfolio',
      url: 'https://my-portfolio.vercel.app',
      framework: 'Next.js',
      region: 'iad1'
    },
    {
      id: 'project-2', 
      name: 'Blog Site',
      url: 'https://blog-site.vercel.app',
      framework: 'React',
      region: 'hnd1'
    },
    {
      id: 'project-3',
      name: 'E-commerce',
      url: 'https://ecommerce.vercel.app', 
      framework: 'Vue.js',
      region: 'sfo1'
    }
  ],
  
  // API配置
  api: {
    baseUrl: 'https://api.vercel.com',
    version: 'v1',
    timeout: 10000
  },
  
  // 分析数据配置
  analytics: {
    // 是否启用真实数据获取
    enableRealData: true,
    // 数据刷新间隔（秒）
    refreshInterval: 30,
    // 默认时间范围
    defaultTimeRange: '7days'
  }
};

// 环境变量配置
export const ENV_CONFIG = {
  VERCEL_TOKEN: import.meta.env.VITE_VERCEL_TOKEN || '',
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.vercel.com',
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true'
};
