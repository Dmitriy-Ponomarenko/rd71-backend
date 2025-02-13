import { Tcp } from "./Tcp.js";

import { IService } from "../types/services.js";

export class App implements IService {
  private static instance: App;

  private tcp: IService = new Tcp();

  constructor() {
    if (!App.instance) {
      App.instance = this;
    }

    return App.instance;
  }

  async init() {
    const { tcp } = this;
    console.log("App started");

    await tcp.init();

    return true;
  }
}
