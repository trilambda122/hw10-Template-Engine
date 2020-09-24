let Employee = require('./employee.js');

class Intern extends Employee {
    constructor(_name, _id, _email, _school) {

        super(_name, _id, _email);
        this.school = _school;

    }
    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }

}
module.exports = Intern;