import * as dotenv from 'dotenv';
import Server from './models/server.js';

dotenv.config();

const app = new Server();

app.start();