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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNote = exports.addNote = exports.getNotes = void 0;
const note_service_1 = require("./note.service");
function getNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filterBy = req.query;
        console.log('getNotes');
        try {
            const notes = yield note_service_1.noteService.query();
            res.json(notes);
        }
        catch (error) {
            res.status(400).send({ err: 'Failed to get stays' });
        }
    });
}
exports.getNotes = getNotes;
function addNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newNote = req.body;
        try {
            const addNote = yield note_service_1.noteService.addNote(newNote);
            res.status(200).send({ success: true, data: addNote });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not add note' });
        }
    });
}
exports.addNote = addNote;
function getNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteId = req.params.id;
        try {
            const note = yield note_service_1.noteService.getNote(noteId);
            res.status(200).send({ success: true, data: note });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not get note' });
        }
    });
}
exports.getNote = getNote;
