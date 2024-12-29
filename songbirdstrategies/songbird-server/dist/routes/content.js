"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentRoutes = void 0;
const express_1 = require("express");
const content_1 = require("../controllers/content");
const router = (0, express_1.Router)();
router.post('/generate', content_1.ContentController.generate);
exports.contentRoutes = router;
