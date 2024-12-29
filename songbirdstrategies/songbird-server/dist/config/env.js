"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default('3001'),
    OPENAI_API_KEY: zod_1.z.string({
        required_error: 'OPENAI_API_KEY is required',
    }),
    FRONTEND_URL: zod_1.z.string().default('http://localhost:3000'),
});
const parseEnv = () => {
    try {
        return envSchema.parse(process.env);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const missingVars = error.errors.map(e => e.path.join('.')).join(', ');
            throw new Error(`Missing environment variables: ${missingVars}`);
        }
        throw error;
    }
};
exports.env = parseEnv();
