"use strict";
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
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        if (!user.username || !user.password || !user.email)
            return res
                .status(400)
                .send({ success: false, message: 'Missing parameters.' });
        try {
            const existingUsername = yield user_service_1.userService.getUserByUsername(user.username);
            if (existingUsername)
                return res
                    .status(400)
                    .send({ success: false, message: 'Username has been taken.' });
            const existingEmail = yield user_service_1.userService.getUserByEmail(user.email);
            if (existingEmail)
                return res
                    .status(400)
                    .send({ success: false, message: 'Email has been taken.' });
            // Hash password
            const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
            const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
            const addedUser = yield user_service_1.userService.addUser(newUser);
            req.session.userId = addedUser._id;
            res.status(200).send({ success: true, data: addedUser });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not add user' });
        }
    });
}
exports.signup = signup;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        if (!user.username || !user.password)
            return res
                .status(400)
                .send({ success: false, message: 'Missing parameters.' });
        try {
            const loggedInUser = yield user_service_1.userService.getUserWithPassword(user.username);
            if (!loggedInUser) {
                return res
                    .status(401)
                    .send({ success: false, message: 'Invalid credentials' });
            }
            const passwordMatch = yield bcrypt_1.default.compare(user.password, loggedInUser.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .send({ success: false, message: 'Invalid credentials' });
            }
            req.session.userId = loggedInUser._id;
            res
                .status(200)
                .send({ success: true, data: { username: loggedInUser.username } });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not login' });
        }
    });
}
exports.login = login;
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        req.session.destroy((err) => {
            if (err) {
                return res
                    .status(400)
                    .send({ success: false, message: 'Could not logout' });
            }
            res.clearCookie('connect.sid');
            res.status(200).send({ success: true, message: 'Logged out' });
        });
    });
}
exports.logout = logout;
