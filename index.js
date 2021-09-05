#!/usr/bin/env node

const { generateIdeas } = require('./src/brainstorm');

require('yargs').usage('./index.js --help')
    .command('ideas [idea]', 'brainstorm about an idea, example usage: `bstorm ideas "Brainstorm names for my business, it\'s an API that can send both iMessages and SMS."`', (yargs) => {
        yargs.positional('idea', {
            describe: 'an idea phrased as a command, example: "Brainstorm growth ideas for a business that creates GPT-3 command line tools"`'
        })
    }, async (argv) => {
        let idea = argv["idea"];
        let n = argv["num-idea-sets"];

        console.log("Generating completions...")

        const ideas = await generateIdeas(idea,n);

        ideas.forEach((idea, idx) => {
            console.log("Idea set " + (idx + 1) + ":");
            console.log(idea);
        });
    })
    .option('num-idea-sets', {
        alias: 'n',
        type: 'number',
        description: 'The number of idea sets to come up with *THIS IS NOT THE NUMBER OF IDEAS n=1 should be plenty*',
        default: 1
    })
    .demandCommand()
    .argv