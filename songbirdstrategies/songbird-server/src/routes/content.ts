import { Router } from 'express';
import { ContentController } from '../controllers/content';

const router = Router();

router.post('/generate', ContentController.generate);

export const contentRoutes = router;