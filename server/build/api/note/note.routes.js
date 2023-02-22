"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const note_controller_1 = require("./note.controller");
const router = express_1.default.Router();
exports.noteRoutes = router;
router.get('/', note_controller_1.getNotes);
router.get('/:id', note_controller_1.getNote);
router.post('/', note_controller_1.addNote);
