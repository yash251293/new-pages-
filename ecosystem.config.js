module.exports = {
  apps: [
    {
      name: 'culturefix-backend',
      script: './backend/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 'env' block for default or development environment
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      // 'env_production' block for production environment variables, including .env.local
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        // This line tells PM2 to load environment variables from ./.env.local for backend
        env_file: './.env.local' 
      }
    },
    {
      name: 'culturefix-frontend-main',
      script: 'npm',
      args: 'start',
      cwd: './Final UI', // Current working directory for frontend
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // 'env' block for default or development environment
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        // NEXT_PUBLIC_API_URL should typically come from .env.local when env_file is used
        // so you might remove it from here if it's in your .env.local
        // NEXT_PUBLIC_API_URL: 'https://100networks.com/api' 
      },
      // 'env_production' block for production environment variables, including .env.local
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        // This line tells PM2 to load environment variables from ./.env.local for frontend
        env_file: './.env.local' 
        // If NEXT_PUBLIC_API_URL is solely managed via .env.local, ensure it's defined there.
        // If it's hardcoded here AND in .env.local, the value here takes precedence.
        // NEXT_PUBLIC_API_URL: 'https://100networks.com/api' // Keep if needed and not in .env.local
      }
    }
  ]
};