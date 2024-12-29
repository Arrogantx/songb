"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = require("./middleware/cors");
const error_handler_1 = require("./middleware/error-handler");
const health_1 = require("./routes/health");
const content_1 = require("./routes/content");
const createApp = () => {
    const app = (0, express_1.default)();
    // Middleware
    app.use(cors_1.corsMiddleware);
    app.use(express_1.default.json());
    // Set default headers
    app.use((req, res, next) => {
        res.setHeader('Content-Type', 'application/json');
        next();
    });
    // Routes
    app.use('/health', health_1.healthRoutes);
    app.use('/api', content_1.contentRoutes);
    // Error handling
    app.use(error_handler_1.errorHandler);
    // Handle 404
    app.use((req, res) => {
        res.status(404).json({ error: 'Not Found' });
    });
    return app;
};
exports.createApp = createApp;
