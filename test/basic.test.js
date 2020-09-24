const employee = require('../lib/employee.js');
const manager = require('../lib/manager.js');
const engineer = require('../lib/engineer.js');
const intern = require('../lib/intern.js');

describe("Employee", () => {
    describe("Create Employee", () => {
        it("should create an employee object", () => {
            const emp1 = new employee('fred', '01', 'info@info');
            const name = emp1.name;
            const id = emp1.id;
            const email = emp1.email;

            expect(name).toEqual('fred');
            expect(id).toEqual('01');
            expect(email).toEqual('info@info');
        })
    });

    describe("Create Manager", () => {
        it("should create an employee object", () => {
            const emp1 = new manager('fred', '01', 'info@info', '555-5555');
            const name = emp1.name;
            const id = emp1.id;
            const email = emp1.email;
            const officeNumber = emp1.officeNumber;

            expect(name).toEqual('fred');
            expect(id).toEqual('01');
            expect(email).toEqual('info@info');
            expect(officeNumber).toEqual('555-5555');
        })
    });

    describe("Create Engineer", () => {
        it("should create an employee object", () => {
            const emp1 = new engineer('fred', '01', 'info@info', 'github-id');
            const name = emp1.name;
            const id = emp1.id;
            const email = emp1.email;
            const github = emp1.github;

            expect(name).toEqual('fred');
            expect(id).toEqual('01');
            expect(email).toEqual('info@info');
            expect(github).toEqual('github-id');
        })

        describe("Create Intern", () => {
            it("should create an employee object", () => {
                const emp1 = new intern('roger', '01', 'info@info', 'To Cool for School');
                const name = emp1.name;
                const id = emp1.id;
                const email = emp1.email;
                const school = emp1.school;

                expect(name).toEqual('roger');
                expect(id).toEqual('01');
                expect(email).toEqual('info@info');
                expect(school).toEqual('To Cool for School');
            })
        });
    });


});