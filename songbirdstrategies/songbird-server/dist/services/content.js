"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const openai_1 = require("../config/openai");
class ContentService {
    static createPrompt(params) {
        const { audience, goal, tone, contentType, additionalContext } = params;
        const basePrompt = `Create ${contentType} content targeting ${audience} with a ${tone} tone. The goal is to ${goal}.`;
        const contextPrompt = additionalContext ? `\n\nAdditional context: ${additionalContext}` : '';
        return `${basePrompt}${contextPrompt}`;
    }
    static async generateContent(params) {
        const prompt = this.createPrompt(params);
        const completion = await openai_1.openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.7,
            max_tokens: 1000,
        });
        const generatedContent = completion.choices[0]?.message?.content;
        if (!generatedContent) {
            throw new Error('No content generated');
        }
        return generatedContent;
    }
}
exports.ContentService = ContentService;
