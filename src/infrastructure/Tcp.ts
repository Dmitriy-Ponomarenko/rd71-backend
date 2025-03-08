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
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    );
    server.use(express.json());
    server.use(routePrefix, routers);
    useExpressServer(server, {
      cors: true,
      defaultErrorHandler: true,
      validation: false,
    });

    return new Promise<boolean>((resolve) => {
      server.listen(4000, () => {
        console.log('Tcp service started on port 4000');

        return resolve(true);
      });
    });
  }
}
