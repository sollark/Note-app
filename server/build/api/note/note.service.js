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
exports.noteService = void 0;
const note_1 = __importDefault(require("../../mongodb/models/note"));
const query = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find({});
        return notes;
    }
    catch (error) {
        throw error;
    }
});
const addNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newNote = yield note_1.default.create(note);
        return newNote;
    }
    catch (error) {
        throw error;
    }
});
const getNote = (noteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findById(noteId);
        return note;
    }
    catch (error) {
        throw error;
    }
});
exports.noteService = { query, addNote, getNote };
