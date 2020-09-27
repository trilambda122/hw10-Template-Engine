const employee = require('./lib/employee.js');
const manager = require('./lib/manager.js');
const engineer = require('./lib/engineer.js');
const intern = require('./lib/intern.js')
    // const validator = require('./lib/validator.js');
const inquirer = require('inquirer');
const render = require("./lib/htmlRenderer");


const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const figlet = require('figlet');
const Validator = require('./lib/validator.js');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputFile = path.join(OUTPUT_DIR, "team.html");

const v = new Validator();
// create empty array 
let data = [];
// function to take the employee record from the inquirer answers and push them into the data array
function addEmployee(object) {
    object.role = object.getRole();
    data.push(object);
}

function validateDigits(a) {
    if (isNaN(a)) {
        console.log(chalk.bold.red('\n\nPlease enter only numbers\n'));
    } else {
        return true;
    }

}

function validateNull(a) {
    if (a !== '') {
        return true;
    } else { console.log(chalk.bold.red('\n\nPlease enter some data to continue\n')); }

}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
        return true;
    } else { console.log(chalk.bold.red('\n\nPlease enter a valide email address\n')) }
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
            // once the user is done added employee records write the output file. 
            console.table(data);
            fs.writeFileSync(outputFile, render(data), "utf8");

        }

    });
}

function run() {
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

// module.exports = { validateEmail, validateDigits, validateNull };