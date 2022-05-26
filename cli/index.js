#!/usr/bin/env node
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { copyStepTemplate } = require("./stepTemplate");
const { editExistingWorkflow } = require("./editWorkflow");
const { addWorkflow } = require("./addWorkflow");

const OPTIONS = {
  CREATE_WORKFLOW: "Create a new workflow",
  EDIT_WORKFLOW: "Edit an exisitig workflow",
};

console.log(
  chalk.gray(figlet.textSync("VENUS CLI TOOL", { horizontalLayout: "full" }))
);

const cliOptions = () => {
  const questions = [
    {
      type: "list",
      name: "options",
      message: "Please select one of the options  :",
      choices: [OPTIONS.CREATE_WORKFLOW, OPTIONS.EDIT_WORKFLOW],
      default: OPTIONS.CREATE_WORKFLOW,
    },
  ];
  return inquirer.prompt(questions);
};

const run = async () => {
  try {
    const answer = await cliOptions();

    if (answer && answer.options) {
      switch (answer.options) {
        case OPTIONS.CREATE_WORKFLOW:
          addWorkflow();
          break;
        case OPTIONS.EDIT_WORKFLOW:
          editExistingWorkflow();
          break;
        default:
          break;
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};

run();
