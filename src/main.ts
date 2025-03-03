import { App } from './infrastructure/App.js';

const startServer = async (): Promise<void> => {
  try {
    const app = App.getInstance();
    await app.init();
    console.log('Server started successfully');
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
