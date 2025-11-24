// gemini-api.js

class GeminiAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;
    }

    async getResponse(message) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: message,
                        }],
                    }],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error('Error getting Gemini response:', error);
            return 'Sorry, something went wrong. Please try again later.';
        }
    }
}

export { GeminiAPI };
