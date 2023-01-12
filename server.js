// Include packages needed to run application
const inquirer = require(`inquirer`);
// const fs = require(`fs`);
require('dotenv').config();
const cTable = require('console.table');

// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the company_db database.`)
);

// creating a function for the menu. this will display the list of options for the user
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
            else if (answers.menu === "View employees by department") {
                viewByDept();
            }
            else if (answers.menu === "Delete departments") {
                deleteDept();
            }
            else if (answers.menu === "Delete roles") {
                deleteRole();
            }
            else if (answers.menu === "Delete employees") {
                deleteEmployee();
            }
            else if (answers.menu === "View budget by department") {
                viewBudgetByDept();
            }
        })
};

// function to view departments
function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, departments) {
        console.table(departments);
        menu();
    });
};
// function to view roles
function viewRoles() {
    db.query('SELECT roles.id AS Role_ID, title AS Title, salary AS Salary, departments.name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ', function (err, results) {
        console.table(results);
        menu();
    });
};
// function to view employees
function viewEmployees() {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, title, departments.name AS department, salary, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN employees AS m ON employees.manager_id = m.id LEFT JOIN departments on roles.department_id = departments.id ', function (err, results) {
        console.table(results);
        menu();
    });
};
// function to add a department
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
// function to add a role
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
                message: `What is the id of the department this role belongs to?`,
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
// function to add an employee
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
// function to update an employee
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
// function to update an employee manager (bonus)
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
            else db.query("UPDATE employees SET manager_id = ? WHERE id = ?", [answers.updateempmgr, answers.emp], err => {
                viewEmployees();
            })
        })
};
// function to view employees by manager (bonus)
function viewByMgr() {
    db.promise().query('SELECT DISTINCT e.id, e.first_name, e.last_name FROM employees e left JOIN employees m ON e.id = m.manager_id WHERE m.manager_id IS NOT NULL')
        .then(([rows]) => {
            let mgrs = [];
            rows.forEach(mgr => {
                mgrs.push({ name: `${mgr.first_name} ${mgr.last_name}`, value: mgr.id })
            });
            inquirer
                .prompt([
                    {
                        type: `list`,
                        name: `mgr`,
                        message: `What is the id of the manager you want to view employees by?`,
                        choices: mgrs
                    },
                ])
                .then((answers) => {
                    {
                        db.promise().query('SELECT first_name, last_name FROM employees WHERE manager_id = ?', [answers.mgr], err => {
                        }).then(([rows]) => {
                            console.table(rows)
                            menu();
                        });
                    }
                })
        })

};
// function to view employees by department (bonus)
function viewByDept() {
    db.promise().query('SELECT DISTINCT d.name FROM departments d')
        .then(([rows]) => {
            let depts = [];
            rows.forEach(dept => {
                depts.push({ name: `${dept.name}`, value: dept.name })
            });
            inquirer
                .prompt([
                    {
                        type: `list`,
                        name: `dept`,
                        message: `What is the department you wish to view employees by?`,
                        choices: depts
                    },
                ])
                .then((answers) => {
                    {
                        db.promise().query('SELECT e.id, e.first_name, e.last_name, d.name AS department FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id WHERE d.name = ?', [answers.dept], err => {
                        }).then(([rows]) => {
                            console.table(rows)
                            menu();
                        });
                    }
                })
        }
        )}
// function to delete a department (bonus)
function deleteDept() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `deleteD`,
                message: `What is the id of the department you want to delete?`,
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
            db.query("DELETE FROM departments where id = ?", [answers.deleteD], err => {
                viewDepartments();
            })
        })
};
// function to delete a role (bonus)
function deleteRole() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `deleteR`,
                message: `What is the id of the role you want to delete?`,
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
            db.query("DELETE FROM roles where id = ?", [answers.deleteR], err => {
                viewRoles();
            })
        })
};
// function to delete an employee (bonus)
function deleteEmployee() {
    inquirer
        .prompt([
            {
                type: `input`,
                name: `deleteE`,
                message: `What is the id of the employee you want to delete?`,
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
            db.query("DELETE FROM employees where id = ?", [answers.deleteE], err => {
                viewEmployees();
            })
        })
};
// function to view the budget of all departments (bonus)
function viewBudgetByDept() {
    db.query('SELECT departments.name AS Department,  SUM(roles.salary) AS Salary  FROM roles INNER JOIN departments ON roles.department_id = departments.id GROUP BY departments.name ORDER BY Salary DESC', function (err, budget) {
        console.table(budget);
        menu();
    });
};
// calls the menu function which starts everything 
menu();
