"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    // Ensure we're sending JSON response
    res.setHeader('Content-Type', 'application/json');
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An unexpected error occurred';
    res.status(statusCode).json({
        error: message,
    });
};
exports.errorHandler = errorHandler;
