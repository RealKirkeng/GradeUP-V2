// gemini.js

import { GeminiAPI } from './gemini-api.js';

let geminiApi;

const getGeminiResponse = async (message) => {
    if (!geminiApi) {
        const apiKey = prompt('Please enter your Gemini API key:');
        if (!apiKey) {
            return 'API key is required to use the Gemini AI.';
        }
        geminiApi = new GeminiAPI(apiKey);
    }

    console.log(`Sending message to Gemini: ${message}`);
    const response = await geminiApi.getResponse(message);
    console.log(`Received response from Gemini: ${response}`);
    return response;
};

export { getGeminiResponse };
