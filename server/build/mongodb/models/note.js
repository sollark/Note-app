"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String },
    createdAt: { type: Number, default: Date.now() },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, required: true },
});
const noteModel = (0, mongoose_1.model)('Note', noteSchema);
exports.default = noteModel;
