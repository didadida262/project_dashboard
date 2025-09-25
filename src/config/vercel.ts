// Vercel配置
export const VERCEL_CONFIG = {
  // 您的Vercel项目URL列表 - 只需要输入项目地址
  projectUrls: [
    'https://hhvcg-blog-v2.vercel.app/',
    'https://project-cesium.vercel.app/'
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
