let Employee = require('./employee.js');

class Engineer extends Employee {
    constructor(_name, _id, _email, _github) {

        super(_name, _id, _email);
        this.github = _github;

    }
    getGithub() {
        return this.github;
    }

    getRole() {
        return 'Engineer';
    }

}
module.exports = Engineer;