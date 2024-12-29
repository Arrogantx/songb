"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentController = void 0;
const content_1 = require("../services/content");
const content_2 = require("../types/content");
class ContentController {
    static async generate(req, res, next) {
        try {
            // Ensure request has proper content type
            if (!req.is('application/json')) {
                const error = new Error('Content-Type must be application/json');
                error.statusCode = 400;
                throw error;
            }
            // Validate request body
            const validatedParams = content_2.contentGenerationSchema.parse(req.body);
            // Generate content
            const content = await content_1.ContentService.generateContent(validatedParams);
            // Send JSON response
            res.json({ content });
        }
        catch (error) {
            console.error('Content generation error:', error);
            if (error instanceof Error) {
                const appError = error;
                appError.statusCode = error.name === 'ZodError' ? 400 : 500;
                next(appError);
            }
            else {
                next(new Error('An unexpected error occurred'));
            }
        }
    }
}
exports.ContentController = ContentController;
