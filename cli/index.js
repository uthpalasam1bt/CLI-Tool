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
                    process.exit(-1);
                    break;
            }
        }
    } catch (error) {
        console.log('error', error);
    }
};

run();
