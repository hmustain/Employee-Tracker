// Include packages needed to run application
const inquirer = require(`inquirer`);
const fs = require(`fs`);


const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'company_db'
    },
    console.log(`Connected to the courses_db database.`)
);

// Query database
// i moved these and put them inside functions



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

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
                    "Update employee manager",
                    "View employees by manager",
                    "View employees by department",
                    "Delete departments",
                    "Delete roles",
                    "Delete employees",
                    "View budget by department"
                ]
            }
        ])
        .then((answers) => {
            if (answers.menu === "View all departments") {
                viewDepartments();
            } else if (answers.menu === "View all roles") {
                viewRoles();
            } else if (answers.menu === "View all employees") {
                viewEmployees();
            }
            else if (answers.menu === "Add a department") {
                addDepartment();
            }
            else if (answers.menu === "Add a role") {
                addRole();
            }
            else if (answers.menu === "Add an employee") {
                addEmployee();
            }
            else if (answers.menu === "Update an employee") {
                updateEmployee();
            }
            else if (answers.menu === "Update employee manager") {
                updateEmployeeMgr();
            }
            else if (answers.menu === "View employees by manager") {
                viewByMgr();
            }
        })
};

function viewDepartments() {
 db.query('SELECT * FROM departments', function (err, departments) {
        console.table(departments);
        menu();
    });
};

function viewRoles() {
    db.query('SELECT title AS Title, salary AS Salary, department_id AS Department FROM roles LEFT JOIN departments ON departments.name = departments.id ', function (err, results) {
        console.table(results);
        menu();
    });
};

function viewEmployees() {
    db.query('SELECT employees.first_name, employees.last_name, title, salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id ', function (err, results) {
        console.table(results);
        menu();
    });
};

function addDepartment() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `adddept`,
                message: `What is the name of the department you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
        ])
        .then((answers) => {
            db.query("INSERT INTO departments (name) VALUES (?)", [answers.adddept], err => {
                viewDepartments();
            })
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `addrole`,
                message: `What is the name of the role you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `addsalary`,
                message: `What is the salary of the role you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `adddeptid`,
                message: `What is the id of the role you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
        ])
        .then((answers) => {
            db.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [answers.addrole, answers.addsalary, answers.adddeptid], err => {
                viewRoles();
            })
        })
};
function addEmployee() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `addemployeefirst`,
                message: `What is the first name of the employee you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `addemployeelast`,
                message: `What is the last name of the employee you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `addemployeerole`,
                message: `What is the role of the employee you want to add?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `addemployeemgr`,
                message: `What is the manager id of the employee you want to add?`,

            },
        ])
        .then((answers) => {
            console.log(answers.addemployeemgr)
            if (answers.addemployeemgr == "null") {
                db.query("INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)", [answers.addemployeefirst, answers.addemployeelast, answers.addemployeerole], err => {
                    viewEmployees();
                })
            }
            else {
                db.query("INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES (?,?,?,?)", [answers.addemployeefirst, answers.addemployeelast, answers.addemployeerole, answers.addemployeemgr], err => {
                    viewEmployees();
                })
            }
        })
};

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `updateemp`,
                message: `What is the id of the employee you want to update?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `updateemprole`,
                message: `What is the new role you want to give to this employee?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
        ])
        .then((answers) => {
             {
                db.query("UPDATE employees SET role_id = ? WHERE id = ?", [answers.updateemprole, answers.updateemp], err => {
                    viewEmployees();
                })
            }
        })
};

function updateEmployeeMgr() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `emp`,
                message: `What is the id of the employee you want to update?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
            {
                type: `input`,
                name: `updateempmgr`,
                message: `What is the id of the new manager you want to assign to this employee?`,
                validate: (data) => {
                    if (data) {
                        return true;
                    } else {
                        return "You must enter information to continue";
                    }
                },
            },
        ])
        .then((answers) => {
            if (answers.updateempmgr === "null") {
                db.query("UPDATE employees SET manager_id = ? WHERE id = ?", [answers.updateempmgr], err => {
                    viewEmployees();
                })
            }
            else db.query("UPDATE employees SET manager_id = ? WHERE id = ?" , [answers.updateempmgr, answers.emp], err => {
                viewEmployees();
            })
        })
};
// function viewByMgr() {
//     inquirer
//         .prompt([
//             {
//                 type: `input`,
//                 name: `mgr`,
//                 message: `What is the id of the manager you want to view employees by?`,
//                 validate: (data) => {
//                     if (data) {
//                         return true;
//                     } else {
//                         return "You must enter information to continue";
//                     }
//                 },
//             },
//         ])
//         .then((answers) => {
//              {
//                 db.query('SELECT employees.id, employees.first_name, employees.last_name, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id WHERE manager_id = ?', [answers.mgr], err => {
//                     viewByMgr();
//                 })
//             }
//         })
// };
menu();
