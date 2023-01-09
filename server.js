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
        .then((answers) => {
            if (answers.menu === "View all departments") {
                viewDepartments();
            } else if (answers.menu === "View all roles") {
                viewRoles();
            } else if (answers.menu === "View all employees") {
                viewEmployees();
            }
        })
};

function viewDepartments() {
 let departments = db.query('SELECT * FROM departments', function (err, departments) {
        console.table(departments);
      });
};

function viewRoles() {
    db.query('SELECT title AS Title, salary AS Salary, department_id AS Department FROM roles LEFT JOIN departments ON departments.name = departments.id ', function (err, results) {
        console.table(results);
      });
};

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
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
        ]);
};
menu();
