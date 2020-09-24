let Employee = require('./employee.js');
const Engineer = require('./engineer.js');
class Manager extends Employee {
    constructor(_name, _id, _email, _officeNumber) {

        super(_name, _id, _email);
        this.officeNumber = _officeNumber;

    }
    getRole() {
        return 'Manager';
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;