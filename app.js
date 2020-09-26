const employee = require('./lib/employee.js');
const manager = require('./lib/manager.js');
const engineer = require('./lib/engineer.js');
const intern = require('./lib/intern.js')
const inquirer = require('inquirer');
const render = require("./lib/htmlRenderer");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");

// create empty array 
let data = [];

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
            // once the user is done added employee records write the output file. 
            console.table(data);
            fs.writeFileSync(outputFile, render(data), "utf8");

        }

    });
}

function run() {
    // create empty file
    fs.closeSync(fs.openSync(outputFile, 'w'));
    askQuestions();


}

run();