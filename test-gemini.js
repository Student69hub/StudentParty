const BOT_CONTEXT = "You are a helpful assistant.";
const KEY = "AIzaSyDwb2Sl2_F6I3dBKgTgksyOvr89RkXESmU";
const MODEL = "gemini-1.5-flash";
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`;

const historyArray = [
    { role: "user", parts: [{ text: "Hello" }] }
];

async function test() {
    const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: BOT_CONTEXT }] },
            contents: historyArray,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800
            }
        })
    });
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
}

test();
