function run() {
    const employee = require('./lib/employee.js');
    const manager = require('./lib/manager.js');
    const engineer = require('./lib/engineer.js');


    let fred = new employee('fred', '01', 'fred@info.com');
    let heather = new manager('heather', '02', 'heather@info', '814.2485341');
    let geogre = new engineer("george", "05", "george@jungle", 'github');


    console.log(heather.officeNumber);

    console.log(geogre);

    console.log(fred.getRole());
}

run();