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
exports.deleteNote = exports.getNote = exports.updateNote = exports.addNote = exports.getNotes = void 0;
const note_service_1 = require("./note.service");
function getNotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const filterBy = req.query
        try {
            const userId = req.session.userId;
            const notes = yield note_service_1.noteService.query(userId);
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
        const newNote = Object.assign(Object.assign({}, req.body), { createdBy: req.session.userId });
        try {
            const addedNote = yield note_service_1.noteService.addNote(newNote);
            res.status(200).send({ success: true, data: addedNote });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not add note' });
        }
    });
}
exports.addNote = addNote;
function updateNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const note = req.body;
        const noteId = req.params.id;
        try {
            const updatedNote = yield note_service_1.noteService.updateNote(noteId, note);
            res.status(200).send({ success: true, data: updatedNote });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not update note' });
        }
    });
}
exports.updateNote = updateNote;
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
function deleteNote(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const noteId = req.params.id;
        try {
            yield note_service_1.noteService.deleteNote(noteId);
            res.status(200).send({ success: true, message: 'Note deleted' });
        }
        catch (error) {
            res.status(400).send({ success: false, message: 'Could not delete note' });
        }
    });
}
exports.deleteNote = deleteNote;
