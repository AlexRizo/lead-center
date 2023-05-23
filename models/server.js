import express from "express";
import cors from "cors";
import path from "path";
import http from 'http';
import { fileURLToPath, URL } from 'url';
import { Server as socketServer } from 'socket.io';

import database from "../database/database.js";

import homeRouter from "../routes/home.js";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import staffRouter from "../routes/staff.js";
import sellerRouter from "../routes/sellerNote.js";

import expressLayouts from "express-ejs-layouts";
import socketController from "../sockets/socketController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    constructor() {
        this.app = express();
        this._port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = new socketServer(this.server);
        this.paths = {
            home: '/',
            auth: '/auth',
            user: '/users',
            staff: '/staff',
            team: '/teams',
            seller: '/sellers'
        }

        // Conectar DB;
        this.dbConnection();
        
        // Middlewares;
        this.middlewares();

        // Layouts;
        this.layouts();
        
        // Sockets;
        this.sockets();
        
        // Rutas;
        this.routes();
    }

    async dbConnection() {
        try {
            await database.authenticate();
            console.log('Database online');
        } catch (error) {
            throw error;
        }
    }

    layouts() {
        this.app.use(expressLayouts);
        this.app.set('view engine', 'ejs');
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        
        // Directorio public;
        this.app.use(express.static('public'));
    }

    routes() {        
        this.app.use(this.paths.auth, authRouter);

        this.app.use(this.paths.home, homeRouter);
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.staff, staffRouter);
        this.app.use(this.paths.seller, sellerRouter);

        this.app.get('/login', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/auth', 'login.html'));
        });

        this.app.get('/403', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/errors', '403.html'));
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/errors', '404.html'));
        });
    }

    sockets() {
        this.io.on('connection', (socket) => socketController(socket, this.io));
    }

    start() {
        this.server.listen(this._port, () => {
            console.log('Running on port', this._port);
        });
    }
}

export default Server;