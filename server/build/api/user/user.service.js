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
exports.userService = void 0;
const user_1 = __importDefault(require("../../mongodb/models/user"));
const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_1.default.create(user);
        return newUser;
    }
    catch (error) {
        throw error;
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default.findById(userId);
        return existingUser;
    }
    catch (error) {
        throw error;
    }
});
const getUserByUsername = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default.findOne({ username: userName });
        return existingUser;
    }
    catch (error) {
        throw error;
    }
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default.findOne({ email });
        return existingUser;
    }
    catch (error) {
        throw error;
    }
});
const getUserWithPassword = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield user_1.default
            .findOne({ username: userName })
            .select('+password');
        return existingUser;
    }
    catch (error) {
        throw error;
    }
});
const updateUser = (userId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(userId, user, {
            new: true,
        });
        return updatedUser;
    }
    catch (error) {
        throw error;
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_1.default.findByIdAndDelete(userId);
    }
    catch (error) {
        throw error;
    }
});
exports.userService = {
    addUser,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUserWithPassword,
    updateUser,
    deleteUser,
};
