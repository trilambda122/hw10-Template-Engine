 // import objects
const employee = require('./lib/employee.js');
const manager = require('./lib/manager.js');
const engineer = require('./lib/engineer.js');
const intern = require('./lib/intern.js')
const Validator = require('./lib/validator.js');

// import modules
const inquirer = require('inquirer');
const render = require("./lib/htmlRenderer");
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const figlet = require('figlet');

// set var for file output
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");


// create empty array to store all the user inputed data into.  Also create a blank validator object to validate the users input
let data = [];
const v = new Validator();


// function to take the employee record from the inquirer answers and push them into the data array
function addEmployee(object) {
    object.role = object.getRole();
    data.push(object);
}



// ask the questions! use the .when property to detirme which questions to ask for which employee type
function askQuestions() {
    inquirer.prompt([{
            name: "employeeType",
            type: 'list',
            message: 'Which type of employee to add?',
            choices: ['Manager', 'Engineer', 'Intern'],
        },

        {
            name: 'employeeName',
            type: 'input',
            message: 'What is the employees full name?',
            validate: v.validateNull
        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'What is the employees ID?',
            validate: v.validateDigits
        },
        {
            name: 'employeeEmail',
            type: 'input',
            message: 'What is the employees Email?',
            validate: v.validateEmail
        },
        {
            name: 'employeeOfficeNumber',
            type: 'input',
            message: 'What is the employees officeNumber?',
            when: function(answers) { return answers.employeeType === 'Manager'; },
            validate: v.validateDigits
        },

        {
            name: 'employeeGithub',
            type: 'input',
            message: 'What is the employees Github username?',
            when: function(answers) { return answers.employeeType === 'Engineer'; },
            validate: v.validateNull
        },
        {
            name: 'employeeSchool',
            type: 'input',
            message: 'What school did the intern go to',
            validate: v.validateNull,
            when: function(answers) { return answers.employeeType === 'Intern'; }
        },

        {
            name: 'addEmployee',
            type: 'confirm',
            message: 'add employee?',

        }

    ]).then(answers => {
        // create the correct employee type based on what was selected 
        switch (answers.employeeType) {
            case 'Manager':
                const m = new manager(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeOfficeNumber);
                addEmployee(m);
                break;
            case 'Engineer':
                const e = new engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeGithub);
                addEmployee(e);
                break;

            case 'Intern':
                const i = new intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeSchool);
                addEmployee(i);
                break;
            default:
                console.log("something isnt right here");
        }
        // If user selects "y" ask the questions again to create another employee record
        if (answers.addEmployee) {
            askQuestions();
        } else {
            // loop through the data and verify there is a manager for the group.
            let haveManager = false;
            data.forEach(item => {
                if (item.getRole() === 'Manager') {
                    haveManager = true;
                }
            });

            // if there is a manager in the group write the output file. Else print a message and allow for user to keep entering employees.
            if (haveManager) {
                console.table(data);
                fs.writeFileSync(outputFile, render(data), "utf8");
            } else {
                console.log(chalk.bold.redBright('\n Please add a manager to your group\n Or your going to have chaos\n'));
                askQuestions();
            }
        }

    });
}

function run() {
    // print start  up banner
    console.log(chalk.blueBright(figlet.textSync('Team Builder', {
        font: 'Doom',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })));
    // create empty file
    fs.closeSync(fs.openSync(outputFile, 'w'));
    askQuestions();


}

run();