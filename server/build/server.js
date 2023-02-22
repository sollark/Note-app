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
// import { fileURLToPath, pathToFileURL } from 'url'
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const connect_1 = require("./mongodb/connect");
// Routes
const note_routes_1 = require("./api/note/note.routes");
// Environment variables
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const PORT = process.env.PORT || 3030;
const NODE_ENV = process.env.NODE_ENV || 'development';
// Path compatible with CommonJS ( I dont know why it is working, it takes __dirname from somewhere )
console.log('__dirname:', __dirname);
// const __dirname = path.dirname(pathToFileURL(__filename).toString())
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
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
    res.send('Hello World!');
});
app.use('/api/note', note_routes_1.noteRoutes);
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
