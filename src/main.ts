import { analytics } from "./modules/analytics.js";
import { App } from './infra/App.js';

const message: String = "Hello NodeJS";
console.log(message);

analytics("Main.ts");

const app = new App();

app.init();
