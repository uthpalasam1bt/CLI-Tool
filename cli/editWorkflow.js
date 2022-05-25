const fs = require("fs");
const readline = require("readline");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const {
  getDirectoriesFormThePath,
  getTemplates,
  deleteDirectoryFiles,
} = require("./utility");
const { templatePath } = require("./constants");

const generateSteps = (stepsAndTemplates, workflow, existingwf) => {
  const stepConfigPath = `../web/src/containers/schemeOptions/updates/stepConfig.js`;
  const data = fs.readFileSync(stepConfigPath);
  let workflowExist = data
    .toString()
    .search(new RegExp(` ${workflow}: {`, "i"));
  const workflowPath = `../web/src/containers/schemeOptions/updates/${workflow}`;
  const rootTemplatePath = templatePath;
  let importComponent = "";
  let mapComponent = workflowExist > 0 ? `` : `,\n\t ${workflow}: { `;

  if (stepsAndTemplates && stepsAndTemplates.length) {
    stepsAndTemplates.map((step, index) => {
      const destination = `${workflowPath}/${step.stepKey}`;
      const source = `${rootTemplatePath}/${step.template}`;

      if (fs.existsSync(source)) {
        fs.mkdirSync(destination);
        if (fs.existsSync(destination)) {
          fse.copySync(source, destination);

          importComponent = importComponent.concat(
            `\nconst Generated${step.stepKey}Component = React.lazy(() => retry(() => import('./${workflow}/${step.stepKey}')));`
          );
          mapComponent = mapComponent.concat(
            `\n\t\t${step.stepKey}: props => <Generated${step.stepKey}Component {...props} />,`
          );
          if (stepsAndTemplates.length - 1 === index && workflowExist < 0) {
            mapComponent = mapComponent.concat(`\n\t}`);
          }
        }
      }
    });

    // generate code
    // Read file
    fs.readFile(stepConfigPath, async function read(err, data) {
      // Check for errors
      if (err) throw err;

      // Define where and what to insert
      if (data) {
        // Get rest of the file to write after inserted text
        var file_content = data.toString();
        let topIndex = file_content.indexOf(
          `/*don't change this line mannully*/`
        );

        let importPosition = file_content.lastIndexOf(";", topIndex) + 1;

        let afterImportComponent = file_content.substring(
          importPosition,
          file_content.length
        );

        // Create buffer
        let file = fs.createWriteStream(stepConfigPath, { flags: "r+" });
        file.pos = importPosition;
        let importComp = Buffer.from(
          importComponent + afterImportComponent,
          "utf-8"
        );
        const imported = await file.write(importComp);
        file.close();

        if (imported) {
          fs.readFile(stepConfigPath, async function read(err, data) {
            // Check for errors
            if (err) throw err;

            // Define where and what to insert
            if (data) {
              let mappingPosition;
              let afterComponentMap;
              let content = data.toString();
              let lines = content.toString().split("\n");
              if (workflowExist > 0) {
                let exsistingPostion = content.search(
                  new RegExp(` ${workflow}: {`, "i")
                );
                let exisitingMappingPosition = content.indexOf(
                  "{",
                  exsistingPostion
                );
                mappingPosition = exisitingMappingPosition + 1;
                afterComponentMap = content.substring(
                  mappingPosition,
                  content.length
                );
              } else {
                let bottomIndex = content.indexOf(
                  `/*don't edit after this line mannully or change anything or remove this comment*/`
                );
                mappingPosition = content.lastIndexOf("}", bottomIndex) + 1;
                afterComponentMap = content.substring(
                  mappingPosition,
                  content.length
                );
              }

              file = fs.createWriteStream(stepConfigPath, { flags: "r+" });
              file.pos = mappingPosition;
              let mapComp = Buffer.from(
                mapComponent + afterComponentMap,
                "utf-8"
              );
              file.write(mapComp);
              file.close();
            }
          });
        }
      }
    });
    //
  }
};
const addSteps = async (index, addedSteps, workflow) => {
  const workflowPath = `../web/src/containers/schemeOptions/updates/${workflow}`;
  const steps = [...getDirectoriesFormThePath(workflowPath)];
  if (addedSteps && addedSteps.length) {
    addedSteps.map((step) => {
      steps.push(step.stepKey);
    });
  }
  const templates = getTemplates();

  const questions = [
    {
      type: "input",
      name: `stepKey`,
      message: `Enter the step ${index ? index : ""} key ?`,
      validate: (value) => {
        if (value && value.length && !/[^a-z]/i.test(value)) {
          if (steps.includes(value)) {
            return "can't create a step with this key.";
          } else {
            return true;
          }
        } else {
          return "enter a valid name";
        }
      },
    },
    {
      type: "list",
      name: "template",
      message: `select a template for the step ${index ? index : ""} ?`,
      choices: [...templates],
      when: (answer) => {
        return answer.stepKey;
      },
    },
  ];

  if (templates) {
    return await inquirer.prompt(questions);
  }
};
const confirmPrompt = async (steps) => {
  const confirmSteps = steps.map((step, index) => {
    return `step key - ${step.stepKey} => template - ${step.template}`;
  });
  let message;
  if (confirmSteps && confirmSteps.length) {
    message = confirmSteps.join("\n");
  }

  const confirmPrompt = [
    {
      type: "confirm",
      name: "confirm",
      message: `${message}`,
      default: true,
    },
  ];

  if (steps && steps.length) {
    console.log(chalk.blue("confirm entered step details:"));
    return await inquirer.prompt(confirmPrompt);
  }
};

const editExistingWorkflow = async () => {
  const stepsAndTemplates = [];
  const rootpath = `../web/src/containers/schemeOptions/updates`;
  const existingWf = getDirectoriesFormThePath(rootpath);

  if (existingWf && existingWf.length) {
    const selectWorkflowPrompt = [
      {
        type: "list",
        name: "workflow",
        message: "select an workflow to continue :",
        choices: [...existingWf],
      },
      {
        type: "list",
        name: "option",
        message: "select an option",
        choices: ["add new steps", "edit an existing step"],
        when: (answer) => {
          return answer.workflow;
        },
      },
    ];

    const answers = await inquirer.prompt(selectWorkflowPrompt);

    if (answers && answers.option) {
      if (answers.option === "add new steps") {
        const stepPrompt = [
          {
            type: "number",
            name: "stepCount",
            message: "How many step do you want to add ?",
            validate: (value) => {
              if (value && value > 0) {
                return true;
              } else {
                return "enter a valid number (min=1)";
              }
            },
          },
        ];
        const count = await inquirer.prompt(stepPrompt);

        if (count.stepCount) {
          for (let i = 0; i < count.stepCount; i++) {
            const answer = await addSteps(
              i + 1,
              stepsAndTemplates,
              answers.workflow
            );
            if (answer) {
              stepsAndTemplates.push(answer);
            }
          }
        }

        if (stepsAndTemplates.length) {
          const confirmAnswer = await confirmPrompt(stepsAndTemplates);

          if (confirmAnswer && confirmAnswer.confirm) {
            generateSteps(stepsAndTemplates, answers.workflow, true);
          } else {
            editExistingWorkflow();
          }
        }
      }

      if (answers.option === "edit an existing step") {
        editExisitingStep(answers.workflow);
      }
    }
  } else {
    return console.log(chalk.red("there is no worflows to edit"));
  }
};

const editExisitingStep = async (workflow) => {
  const workflowPath = `../web/src/containers/schemeOptions/updates/${workflow}`;
  const exisitingSteps = getDirectoriesFormThePath(workflowPath);

  if (exisitingSteps && exisitingSteps.length) {
    const selectStepPrompt = [
      {
        type: "list",
        name: "step",
        message: `select a step to continue from ${workflow} workflow :`,
        choices: [...exisitingSteps],
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Are you sure want to edit this step ?",
        default: true,
      },
    ];

    const answers = await inquirer.prompt(selectStepPrompt);

    if (answers && answers.confirm) {
      const template = await editStepTemplate();

      if (template && template.confirm) {
        const stepPath = `../web/src/containers/schemeOptions/updates/${workflow}/${answers.step}`;
        const source = `${templatePath}/${template.template}`;

        deleteDirectoryFiles(stepPath);

        if (fs.existsSync(source)) {
          if (fs.existsSync(stepPath)) {
            fse.copySync(source, stepPath);
            console.log(chalk.green("success"));
          }
        }
      } else {
        editExisitingStep(workflow);
      }
    } else {
      editExisitingStep(workflow);
    }
  } else {
    return console.log(chalk.red("there is no steps to edit"));
  }
};

const editStepTemplate = async () => {
  const templates = getTemplates();
  const selectStepPrompt = [
    {
      type: "list",
      name: "template",
      message: "select a template for the step :",
      choices: [...templates],
    },
    {
      type: "confirm",
      name: "confirm",
      message: "Are you sure want to replace the existing template ?",
      default: true,
    },
  ];

  return await inquirer.prompt(selectStepPrompt);
};

module.exports = {
  editExistingWorkflow,
  addSteps,
  generateSteps,
  confirmPrompt,
};
