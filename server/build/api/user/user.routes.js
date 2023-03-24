"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post('/signup', user_controller_1.signup);
router.post('/login', user_controller_1.login);
router.put('/logout', user_controller_1.logout);
