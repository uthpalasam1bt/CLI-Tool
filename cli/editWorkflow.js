const fs = require("fs");
const readline = require("readline");
const path = require("path");
const figlet = require("figlet");
const chalk = require("chalk");
const inquirer = require("inquirer");
const fse = require("fs-extra");

const selectWorkflow=async ()=>{


}

const editExistingWorkflow= async ()=>{
   
    const rootPath=`../web/src/containers/schemeOptions/updates`
    const files=await fs.promises.readdir(rootPath)
    const existingWf=files.filter((file)=>{
        const filepath=path.join(rootPath,file)
        return fs.lstatSync(filepath).isDirectory() 
    })
    
    if(existingWf && existingWf.length){
        const selectWorkflowPrompt=[
            {
                type:'list',
                name: "workflow",
                message: "select an workflow to continue :",
                choices: [...existingWf]
    
            },
            {
                type:'list',
                name:'option',
                message:'select an option',
                choices:[
                    'add new steps',
                    'edit an existing step'
                ],
                when:(answer)=>{
                    return answer.workflow
                }
            }
        ]

        const answers=await inquirer.prompt(selectWorkflowPrompt)

        if(answers && answers.option){
            if(answers.option==='add new steps'){
                const stepPrompt=[
                    {
                        type:'input',
                        name:'stepCount',
                        message:'How many step do you want to add ?',
                        validate:(value)=>{
                            if(value && !isNaN(value) && value >0){
                                return true
                            }else{
                                return "enter a valid number (min=1)"
                            }

                        },
                    }
                ]
            const count=await inquirer.prompt(stepPrompt)

            if(count.stepCount){
                for(let i=0;i<count.stepCount;i++){
                    console.log("steps")
                }
            }
            }
        }
    }else{
        return console.log(chalk.red("there is no worflows to edit"))
    }

 
  

}






module.exports={
    editExistingWorkflow
}
