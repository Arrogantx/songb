import { Request, Response, NextFunction } from 'express';
import { ContentService } from '../services/content';
import { contentGenerationSchema } from '../types/content';
import { AppError } from '../middleware/error-handler';

export class ContentController {
  static async generate(req: Request, res: Response, next: NextFunction) {
    try {
      // Ensure request has proper content type
      if (!req.is('application/json')) {
        const error = new Error('Content-Type must be application/json') as AppError;
        error.statusCode = 400;
        throw error;
      }

      // Validate request body
      const validatedParams = contentGenerationSchema.parse(req.body);
      
      // Generate content
      const content = await ContentService.generateContent(validatedParams);
      
      // Send JSON response
      res.json({ content });
    } catch (error) {
      console.error('Content generation error:', error);

      if (error instanceof Error) {
        const appError: AppError = error;
        appError.statusCode = error.name === 'ZodError' ? 400 : 500;
        next(appError);
      } else {
        next(new Error('An unexpected error occurred'));
      }
    }
  }
}