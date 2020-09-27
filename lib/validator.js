const chalk = require('chalk');


class Validator {
    constructor(_info) {
        this.info = _info;
    }
    printInfo() {

        return `this is the info ${this.info}`;;
    }

    validateEmail(info) {
        var re = /\S+@\S+\.\S+/;
        if (re.test(info)) {
            return true;
        } else {
            console.log(chalk.bold.red('\n\nPlease enter a valide email address\n'));
            return false;
        }
    }

    validateNull(info) {
        if (info !== '') {
            return true;
        } else {
            console.log(chalk.bold.red('\n\nPlease enter some data to continue\n'));
            return false;
        }
    }

    validateDigits(info) {
        if (isNaN(info)) {
            console.log(chalk.bold.red('\n\nPlease enter only numbers\n'));
            return false;
        } else {
            return true;
        }


    }
}
module.exports = Validator;