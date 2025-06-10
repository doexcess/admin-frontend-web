module.exports = {
  apps: [
    {
      name: `hq-main`,
      script: 'npm',
      args: 'run prod',
      env: {
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: 3000,
        PM2_SERVE_SPA: 'true',
        NODE_ENV: 'production',
      },
    },
  ],
};
