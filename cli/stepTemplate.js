const fs = require("fs");
const readline = require("readline");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const {TEMPLATES}=require('./constants')

const copyStepTemplate = async () => {
  console.log(chalk.green("Generate Templates"));

  const questions = [
    {
      type: "input",
      name: "workflow",
      message: "workflow name to generate steps ?",
      validate: (value) => {
        if (value && value.length && !/[^a-z]/i.test(value)) {
          const filePath = `../web/src/containers/schemeOptions/updates/${value}`;
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
            console.log(
              chalk.green(
                `\n ${value} folder has been  created inside ../web/src/containers/schemeOptions/updates `
              )
            );
          }
          return true;
        } else {
          return "enter a valid name ?";
        }
      },
    },
    {
      type: "input",
      name: "folder",
      message: "Folder name to generate the template ?",
      validate: (value, answer) => {
        if (value && value.length && !/[^a-z]/i.test(value)) {
          let rootPath;
          if (answer && answer.workflow) {
            rootPath = `../web/src/containers/schemeOptions/updates/${answer.workflow}`;
          }

          const filePath = `${rootPath}/${value}`;
          if (rootPath && fs.existsSync(rootPath)) {
            if (!fs.existsSync(filePath)) {
              return true;
            } else {
              return "folder already exist... \n type another name ?";
            }
          } else {
            console.log(
              chalk.red(
                "there is no such workflow inside ../web/src/containers/schemeOptions/updates "
              )
            );
            process.exit(-1);
          }
        } else {
          return "enter a valid name ?";
        }
      },
      when: (answer) => {
        return answer.workflow;
      },
    },
    {
      type: "list",
      name: "template",
      message: "select an template to generate :",
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
        TEMPLATES.UPLOAD_GENERATE_TAB_FORM,
      ],
      default: TEMPLATES.ACTIVATION_DEFAULT,
      when: (answer) => {
        return answer.folder;
      },
    },
  ];
  try {
    const answer = await inquirer.prompt(questions);
    if (answer && answer.template && answer.folder) {
      const stepConfigPath=`../web/src/containers/schemeOptions/updates/stepConfig.js`;
      const destination = `../web/src/containers/schemeOptions/updates/${answer.workflow}/${answer.folder}`;
      const source = `../web/src/containers/schemeOptions/stepTemplates/${answer.template
        .toString()
        .trim()}`;

      if (fs.existsSync(source)) {
        fs.mkdirSync(destination);
        if (fs.existsSync(destination)) {
          const res = fse.copySync(source, destination);

          console.log(
            chalk.green(
              `${answer.template} template has been successfully generated inside the ${destination} folder`
            )
          );

          // generate code 
                        // Read file
                        fs.readFile(stepConfigPath, async function read(err, data) {
                          // Check for errors
                                       if (err) throw err;
                      
                          // Define where and what to insert
                              if(data){
                      
                          let importComponent=`\r\nconst ChangeTrustee = React.lazy(() => retry(() => import('./trustees/chngTrust')));`
                          let mapComponent = `,\n\t tttt: {
                              chngTrust: props => <ChangeTrustee {...props} />,
                              clientApprTrust: props => <ClientApproveTrustee {...props} />,
                              lgimApprTrust: props => <AdminApproveTrustee {...props} />
                          }`;
                      
                          // Get rest of the file to write after inserted text
                          var file_content = data.toString();
                          let topIndex=file_content.indexOf(`/*don't change this line mannully*/`)
                          
                          let importPosition=file_content.lastIndexOf(';',topIndex)+1
                          
                          let afterImportComponent=file_content.substring(importPosition,file_content.length)
                      
                      
                          // Create buffer
                         let file = fs.createWriteStream(stepConfigPath, {flags: "r+"} );
                          file.pos=importPosition
                          let importComp=Buffer.from(importComponent + afterImportComponent,'utf-8');
                          const imported= await file.write(importComp)
                          file.close()
                      
                          if(imported){
                              fs.readFile(stepConfigPath, async function read(err, data) {
                                  // Check for errors
                                               if (err) throw err;
                              
                                  // Define where and what to insert
                                      if(data){
                                          let content=data.toString()
                                          let bottomIndex=content.indexOf(`/*don't edit after this line mannully or change anything or remove this comment*/`)
                                          let mappingPosition=content.lastIndexOf('}',bottomIndex)+1
                                          let afterComponentMap =content.substring(mappingPosition,content.length)
                          
                                          file = fs.createWriteStream(stepConfigPath, {flags: "r+"} );
                                          file.pos =mappingPosition
                                          let mapComp = Buffer.from(mapComponent + afterComponentMap,'utf-8');
                                          file.write(mapComp)
                                          file.close()
                                      }
                                  })
                           
                          }
                          
                         
                      
                          }
                          
                      });
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
  copyStepTemplate,
};
