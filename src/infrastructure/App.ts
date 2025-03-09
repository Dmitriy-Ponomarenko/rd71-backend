// src/infrastructure/App.ts
import { Tcp } from './Tcp.js';
import { IService } from '../types/services.js';

export class App implements IService {
  private static instance: App;
  private tcp: IService;

  private constructor() {
    this.tcp = new Tcp();
  }
  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  public async init(): Promise<boolean> {
    const { tcp } = this;
    await tcp.init();
    return true;
  }
}
