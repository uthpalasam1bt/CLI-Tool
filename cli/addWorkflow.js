const fs = require("fs");
const readline = require("readline");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const fse = require("fs-extra");
const { getDirectoriesFormThePath } = require("./utility");
const { addSteps, confirmPrompt, generateSteps } = require("./editWorkflow");

const addWorkflow = async () => {
  const exisitingWorkflows = getDirectoriesFormThePath(
    `../web/src/containers/schemeOptions/updates`
  );
  const stepsAndTemplates = [];
  const addWorkflowPrompt = [
    {
      type: "input",
      name: "workflow",
      message: "Enter a workflow Key to continue ?",
      validate: (value) => {
        if (value && value.length && !/[^a-z]/i.test(value)) {
          if (exisitingWorkflows.includes(value)) {
            return "this workflow is already exist";
          } else {
            return true;
          }
        } else {
          return "enter a valid name ?";
        }
      },
    },
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
      when: (answer) => {
        return answer.workflow;
      },
    },
  ];

  try {
    const answers = await inquirer.prompt(addWorkflowPrompt);

    if (answers && answers.workflow && answers.stepCount) {
      //   if (answers.workflow) {
      //     const path = `../web/src/containers/schemeOptions/updates/${answers.workflow}`;
      //     fs.mkdirSync(path);
      //     console.log(
      //       chalk.green(`workflow ${answers.workflow} has been created ${path}`)
      //     );
      //   }
      for (let i = 0; i < answers.stepCount; i++) {
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
        const path = `../web/src/containers/schemeOptions/updates/${answers.workflow}`;
        fs.mkdirSync(path);
        console.log(
          chalk.green(`workflow ${answers.workflow} has been created ${path}`)
        );
        generateSteps(stepsAndTemplates, answers.workflow);
      } else {
        addWorkflow();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addWorkflow,
};
