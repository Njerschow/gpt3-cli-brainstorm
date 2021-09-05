
const OpenAI = require('openai-api');
const { _0 } = require('../resources/prompt');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.generateIdeas = async function (idea, n) {
    const prompt = _0 + "\n\nQ: " + idea + "\nA:";

    const completion = await openai.complete({
        prompt: prompt,
        n: n,
        temperature: 0.9,
        maxTokens: 128,
        stop: ["Q:"]
    });

    return completion.data.choices.map(choice => {
        return choice.text;
    })
}