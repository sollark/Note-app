"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const connect_1 = require("./mongodb/connect");
// import routes
const note_routes_1 = require("./api/note/note.routes");
const user_routes_1 = require("./api/user/user.routes");
// Environment variables
const dotenv = __importStar(require("dotenv"));
const requireAuth_middleware_1 = require("./middleware/requireAuth.middleware");
dotenv.config();
const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development';
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
const MONGO_URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// CORS
if (NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, 'public')));
}
else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        // origin: true,
        credentials: true,
    };
    app.use((0, cors_1.default)(corsOptions));
}
app.get('/', (req, res) => {
    res.send('Server is up');
});
// Middleware session
app.use((0, express_session_1.default)({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: MONGO_URI,
    }),
}));
// Routes
app.use('/api/note', requireAuth_middleware_1.requireAuth, note_routes_1.noteRoutes);
app.use('/api/user', user_routes_1.userRoutes);
// 404
app.use(function (req, res, next) {
    console.log('404');
    res.status(404).send('<h1>Page not found on the server</h1>');
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.connectMongo)();
    }
    catch (err) {
        console.log('Could not connect to MongoDB');
        console.error(err);
    }
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
});
startServer();
