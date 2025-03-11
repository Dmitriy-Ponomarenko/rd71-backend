// src/infrastructure/Tcp.ts
import 'reflect-metadata';
import express, { Application } from 'express';
import { useExpressServer } from 'routing-controllers';
import cors from 'cors';
import { IService } from '../types/services.js';
import routers from '../routers/index.js';

export class Tcp implements IService {
  private static instance: Tcp;
  private routePrefix: string = '/api';
  public server: Application;

  constructor() {
    this.server = express();
  }

  public static getInstance(): Tcp {
    if (!Tcp.instance) {
      Tcp.instance = new Tcp();
    }
    return Tcp.instance;
  }
  public async init() {
    const { server, routePrefix } = this;

    server.use(
      cors({
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://rd71-frontend.vercel.app'],
        credentials: true,
      }),
    );
    server.use(express.json());
    server.use(routePrefix, routers);

    useExpressServer(server, { defaultErrorHandler: true, validation: false });

    return new Promise<boolean>((resolve, reject) => {
      const port = process.env.PORT || 4000;
      server
        .listen(port, () => {
          console.log(`Tcp service started on port ${port}`);
          return resolve(true);
        })
        .on('error', (err) => {
          console.error('Failed to start server:', err);
          reject(false);
        });
    });
  }
}
