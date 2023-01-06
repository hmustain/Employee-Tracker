// Include packages needed to run application
const inquirer = require(`inquirer`);
const fs = require(`fs`);

function menu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'What do you want to do?',
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee",
                    "Update employee managers",
                    "View employees by manager",
                    "View employees by department",
                    "Delete departments",
                    "Delete roles",
                    "Delete employees",
                    "View budget by department"
                ]
            }
        ])
};

menu();
