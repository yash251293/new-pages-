module.exports = {
  apps: [
    {
      name: 'culturefix-backend',
      script: './backend/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      }
    },
    {
      name: 'culturefix-frontend-main',
      script: 'npm',
      args: 'start',
      cwd: './Final UI',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://100networks.com/api' 
      }
    }
  ]
};
