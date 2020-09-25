const employee = require('./lib/employee.js');
const manager = require('./lib/manager.js');
const engineer = require('./lib/engineer.js');
const inquirer = require('inquirer');
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");

function writeJsonFile(data) {

    try {
        fs.appendFileSync(outputFile, JSON.stringify(data));
        console.log('The "data to append" was appended to file!');
    } catch (err) {
        console.log(err);
    }
}

function askQuestions() {
    inquirer.prompt([{
            name: "employeeType",
            type: 'list',
            message: 'Which type of employee to add?',
            choices: ['Engineer', 'Manager', 'Intern'],


        },

        {
            name: 'employeeName',
            type: 'input',
            message: 'What is the employees full name?',

        },
        {
            name: 'employeeId',
            type: 'input',
            message: 'What is the employees ID?',

        },
        {
            name: 'employeeEmail',
            type: 'input',
            message: 'What is the employees Email?',

        },
        {
            name: 'employeeOfficeNumber',
            type: 'input',
            message: 'What is the employees officeNumber?',
            when: function(answers) { return answers.employeeType === 'Manager'; }
        },

        {
            name: 'employeeGithub',
            type: 'input',
            message: 'What is the employees Github username?',
            when: function(answers) { return answers.employeeType === 'Engineer'; }
        },
        {
            name: 'employeeSchool',
            type: 'input',
            message: 'What school did the intern go to',
            when: function(answers) { return answers.employeeType === 'Intern'; }
        },

        {
            name: 'addEmployee',
            type: 'confirm',
            message: 'add employee?',

        }

    ]).then(answers => {
        switch (answers.employeeType) {
            case 'Manager':
                const m = new manager(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeOfficeNumber);
                writeJsonFile(m);
                break;
            case 'Engineer':
                const e = new engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeGithub);
                writeJsonFile(e);
                break;
            case 'Intern':
                const i = new intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.employeeSchool);
                writeJsonFile(i);
                break;
            default:
                console.log("something isnt right here");
        }

        console.table(answers);
        // writeJsonFile(answers);

        // ask the questions again to create another employee record
        if (answers.addEmployee) { askQuestions(); }

    });
}

function run() {

    fs.closeSync(fs.openSync(outputFile, 'w'));
    askQuestions();
}

run();