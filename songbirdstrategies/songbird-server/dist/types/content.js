"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentGenerationSchema = void 0;
const zod_1 = require("zod");
exports.contentGenerationSchema = zod_1.z.object({
    audience: zod_1.z.string().min(1, 'Audience is required'),
    goal: zod_1.z.string().min(1, 'Goal is required'),
    tone: zod_1.z.string().min(1, 'Tone is required'),
    contentType: zod_1.z.string().min(1, 'Content type is required'),
    additionalContext: zod_1.z.string().optional(),
});
