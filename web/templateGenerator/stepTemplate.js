const fs = require('fs');
const readline = require('readline');
const path = require('path');
const figlet = require('figlet');
const chalk = require('chalk');
const inquirer = require('inquirer');
const fse = require('fs-extra');

const TEMPLATES = {
    ACTIVATION_DEFAULT: 'activationDefault',
    ACTIVATION_SIMPLE_FORM_FUNCTION: 'activationSimpleFormFunction',
    ACTIVATION_SIMPLE_FORM_JSON: 'activationSimpleFormJSON',
    ACTIVATION_TAB_FORM_FUNCTION: 'activationTabFormFunction',
    ACTIVATION_TAB_FORM_JSON: 'activationTabFormJSON',
    APPROVE_REJECT_DYNAMIC: 'approveRejectDynamic',
    APPROVE_REJECT_SIMPLE_FORM: 'approveRejectSimpleForm',
    APPROVE_REJECT_SINGLE_DOCUMENT: 'approveRejectSingleDoc',
    APPROVE_REJECT_TAB_DOCUMENT: 'approveRejectTabDoc',
    APPROVE_REJECT_TAB_FORM: 'approveRejectTabForm',
    EXECUTION: 'execution',
    PUBLISH_FORM_FUNCTION: 'publishFormFunction',
    PUBLISH_FORM_JSON: 'publishFormJSON',
    PUBLISH_MULTIPLE_DOCUMENT: 'publishMultipleDoc',
    PUBLISH_SINGLE_DOCUMENT: 'publishSingleDoc',
    PUBLISH_UPLOAD_DOC: 'publishUploadDoc',
    SIMPLE_FORM_DATA_CHANGE_DOWNLOAD_JSON: 'simpleFormDataChangeDownloadJson',
    SIMPLE_FORM_DATA_CHANGE_DOWNLOAD_FUNCTION: 'simpleFormDataChangeDownloadFunction',
    SIMPLE_FORM_DATA_DOWNLOAD_FUNCTION: 'simpleFormDataDownload',
    SIMPLE_FORM_DATA_DOWNLOAD_JSON: 'simpleFormDataDownloadJson',
    SIMPLE_FORM_FUNCTION: 'simpleFormFunction',
    SIMPLE_FORM_JSON: 'simpleFormJSON',
    TAB_FORM_DATA_CHANGE_DOWNLOAD_FUNCTION: 'TabFormDataChangeDownloadFunction',
    TAB_FORM_DATA_CHANGE_DOWNLOAD_JSON: 'TabFormDataChangeDownloadJson',
    TAB_FORM_DATA_DOWNLOAD_FUNCTION: 'tabFormDataDownloadFunction',
    TAB_FORM_DATA_DOWNLOAD_JSON: 'tabFormDataDownloadJson',
    TAB_FORM_FUNCTION: 'tabFormFunction',
    TAB_FORM_JSON: 'tabFormJSON',
    UPLOAD_GENERATE_DOCUMENT: 'uploadGenerateDocument',
    UPLOAD_GENERATE_TAB_FORM: 'uploadGenerateTabForm'
};

const copyStepTemplate = async () => {
    console.log(chalk.green('Generate Templates'));
  
    const questions = [
        {
            type: 'input',
            name: 'workflow',
            message: 'workflow name to generate steps ?',
            validate: value => {
                if (value && value.length && !/[^a-z]/i.test(value)) {
                    const filePath = `../web/src/containers/schemeOptions/updates/${value}`;
                    if (!fs.existsSync(filePath)) {
                       fs.mkdirSync(filePath)
                       console.log(chalk.green(`\n ${value} folder has been  created inside ../web/src/containers/schemeOptions/updates `))
                    }
                    return true
                } else {
                    return 'enter a valid name ?';
                }
            }
        },
        {
            type: 'input',
            name: 'folder',
            message: 'Folder name to generate the template ?',
            validate: (value,answer) => {
                if (value && value.length && !/[^a-z]/i.test(value)) {
                    let rootPath
                    if(answer && answer.workflow){
                         rootPath=`../web/src/containers/schemeOptions/updates/${answer.workflow}`
                    }
                   
                    const filePath = `${rootPath}/${value}`;
                    if(rootPath && fs.existsSync(rootPath)){
                        if ( !fs.existsSync(filePath)) {
                            return true;
                        } else {
                            return 'folder already exist... \n type another name ?';
                        }
                    }else{
                        console.log(chalk.red("there is no such workflow inside ../web/src/containers/schemeOptions/updates "))
                        process.exit(-1)
                    }
                
                } else {
                    return 'enter a valid name ?';
                }
            },
            when:(answer)=>{
                return answer.workflow
                 }
         },
        {
            type: 'list',
            name: 'template',
            message: 'select an template to generate :',
            choices: [
                TEMPLATES.ACTIVATION_DEFAULT,
                TEMPLATES.ACTIVATION_SIMPLE_FORM_FUNCTION,
                TEMPLATES.ACTIVATION_SIMPLE_FORM_JSON,
                TEMPLATES.ACTIVATION_TAB_FORM_FUNCTION,
                TEMPLATES.ACTIVATION_TAB_FORM_JSON,
                TEMPLATES.APPROVE_REJECT_DYNAMIC,
                TEMPLATES.APPROVE_REJECT_SIMPLE_FORM,
                TEMPLATES.APPROVE_REJECT_SINGLE_DOCUMENT,
                TEMPLATES.APPROVE_REJECT_TAB_DOCUMENT,
                TEMPLATES.APPROVE_REJECT_TAB_FORM,
                TEMPLATES.EXECUTION,
                TEMPLATES.PUBLISH_FORM_FUNCTION,
                TEMPLATES.PUBLISH_FORM_JSON,
                TEMPLATES.PUBLISH_MULTIPLE_DOCUMENT,
                TEMPLATES.PUBLISH_SINGLE_DOCUMENT,
                TEMPLATES.PUBLISH_UPLOAD_DOC,
                TEMPLATES.SIMPLE_FORM_DATA_CHANGE_DOWNLOAD_JSON,
                TEMPLATES.SIMPLE_FORM_DATA_CHANGE_DOWNLOAD_FUNCTION,
                TEMPLATES.SIMPLE_FORM_DATA_DOWNLOAD_FUNCTION,
                TEMPLATES.SIMPLE_FORM_DATA_DOWNLOAD_JSON,
                TEMPLATES.SIMPLE_FORM_FUNCTION,
                TEMPLATES.SIMPLE_FORM_JSON,
                TEMPLATES.TAB_FORM_DATA_CHANGE_DOWNLOAD_FUNCTION,
                TEMPLATES.TAB_FORM_DATA_CHANGE_DOWNLOAD_JSON,
                TEMPLATES.TAB_FORM_DATA_DOWNLOAD_FUNCTION,
                TEMPLATES.TAB_FORM_DATA_DOWNLOAD_JSON,
                TEMPLATES.TAB_FORM_FUNCTION,
                TEMPLATES.TAB_FORM_JSON,
                TEMPLATES.UPLOAD_GENERATE_DOCUMENT,
                TEMPLATES.UPLOAD_GENERATE_TAB_FORM
            ],
            default: TEMPLATES.ACTIVATION_DEFAULT,
            when: answer => {
                return answer.folder;
            }
        }
    ];
    try {
        const answer = await inquirer.prompt(questions);
        if (answer && answer.template && answer.folder) {
            const destination = `../web/src/containers/schemeOptions/updates/${answer.workflow}/${answer.folder}`;
            const source = `../web/src/containers/schemeOptions/stepTemplates/${answer.template.toString().trim()}`;

            if (fs.existsSync(source)) {
                fs.mkdirSync(destination);
                if (fs.existsSync(destination)) {
                    const res = fse.copySync(source, destination);

                    console.log(
                        chalk.green(
                            `${answer.template} template has been successfully generated inside the ${destination} folder`
                        )
                    );
                }
            } else {
                return console.log(chalk.red(`there is no such template`));
            }
        }
    } catch (error) {
        console.log(chalk.red(error));
    }
};

module.exports = {
    copyStepTemplate
};
