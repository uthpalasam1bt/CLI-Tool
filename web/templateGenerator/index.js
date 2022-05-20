#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { copyStepTemplate } = require('./stepTemplate');

const OPTIONS = {
    GENERATE_STEP_TEMPLATE: 'Generate a step template',
    GENERATE_DOC: 'Generate a Document'
};

console.log(chalk.gray(figlet.textSync('Nav Guide CLI Tool', { horizontalLayout: 'full' })));

const cliOptions = () => {
    const questions = [
        {
            type: 'list',
            name: 'options',
            message: 'select an option :',
            choices: [OPTIONS.GENERATE_STEP_TEMPLATE, OPTIONS.GENERATE_DOC],
            default: 'Generate a step template'
        }
    ];
    return inquirer.prompt(questions);
};

const run = async () => {
    try {
        const answer = await cliOptions();

        if (answer && answer.options) {
            switch (answer.options) {
                case OPTIONS.GENERATE_STEP_TEMPLATE:
                    copyStepTemplate();
                    break;
                case OPTIONS.GENERATE_DOC:
                    break;
                default:
                    console.log(chalk.red('select an valid option'));
                    process.exit(-1);
                    break;
            }
        }
    } catch (error) {
        console.log('error', error);
    }
};

run();

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('What is the Directory name? ', function(dirName) {
//     rl.question('What is the template type ? \n 1) simpleFormFunction \n 2) execution )', function(templateType) {
//         const templatePath= `../web/src/containers/schemeOptions/sampleWorkflows/${dirName}`
//             if (directoryExists(templatePath)) return console.error('directory exists, please choose another name');
//             // fs.mkdirSync(`../web/src/containers/schemeOptions/sampleWorkflows${dirName}`);

//             var source = `../web/src/containers/schemeOptions/stepTemplates/${templateType}`;
//             var destination = `../web/src/containers/schemeOptions/sampleWorkflows/${dirName}`;

//             try {
//                const res= fse.copySync(source, destination);
//                console.log("ress",res);
//                 console.log(`${templateType}, is ctreating  inside ${dirName} directory`);

//                 fs.readFile('../web/src/containers/schemeOptions/sampleWorkflows/index1.txt',  function(err, data) {
//                   if (err)
//                   {
//                     console.log('===>>', err)
//                     throw err;

//                   }
//                   console.log(data);
//               });
//             } catch (err) {
//                 console.error(err);
//             }
//             rl.close();

//     });
// });

// rl.on('close', function() {
//     console.log('\nCompleted...');
//     process.exit(0);
// });
