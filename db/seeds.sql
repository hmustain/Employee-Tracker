-- DATA FOR DEPARTMENTS
INSERT INTO departments (name)
VALUES ("Sales"),
        ("Safety"),
        ("Operations"),
        ("Payroll"),
        ("Shop");

-- SELECT FROM departments;

-- SELECT e.id, e.first_name, e.last_name, d.name FROM employees e LEFT JOIN roles r ON e.role_id = r.id LEFT JOIN departments d ON r.department_id = d.id WHERE d.id = ?;
-- DATA FOR roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Director of Sales", 200000, 1),
        ("Sales Manager", 150000, 1),
        ("Sales Representative", 100000, 1),
        ("Director of Safety", 100000, 2),
        ("Safety Manager", 75000, 2),
        ("Safety Representative", 50000, 2),
        ("Director of Operations", 200000, 3),
        ("Customer Service Manager", 125000, 3),
        ("Fleet Operations Manager", 125000, 3),
        ("Customer Service Lead", 90000, 3),
        ("Fleet Operations Lead", 90000, 3),
        ("Customer Service Representative", 65000, 3),
        ("Driver Manager", 55000, 3),
        ("Director of Payroll", 95000, 4),
        ("Payroll Manager", 70000, 4),
        ("Payroll Representative", 45000, 4),
        ("Director of Maintenance", 100000, 5),
        ("Shop Manager", 75000, 5),
        ("Mechanic", 55000, 5);

-- DATA FOR EMPLOYEES
-- NOTE, NAMES WERE RANDOMLY GENERATED THROUGH A RANDOM NAME GENERATOR
-- https://www.randomlists.com/random-names?qty=60
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Danny", "Cobb", 1, NULL),
        ("Jackson", "Galloway", 2, 1),
        ("Gary", "Jimenez", 3, 2),
        ("Ashley", "Ross", 3, 2),
        ("Raul", "McKenzie", 3, 2),
        ("Rod", "Shepherd", 3, 2),
        ("Alisson", "Jones", 4, NULL),
        ("Kameron", "Rosario", 5, 7),
        ("Kenneth", "Ford", 6, 8),
        ("Bob", "Bernard", 6, 8),
        ("London", "Bentley", 6, 8),
        ("Morgan", "Dickson", 6, 8),
        ("Alden", "Hahn", 6, 8),
        ("Troy", "Hamilton", 7, NULL),
        ("Shea", "Rojas", 8, 14),
        ("Mariah", "Roberts", 9, 14),
        ("Angel", "Mata", 10, 15),
        ("Lena", "McFarland", 11, 16),
        ("Heather", "Vang", 12, 15),
        ("Lamar", "Andrews", 12, 15),
        ("Gideon", "Day", 12, 15),
        ("Keely", "Koch", 12, 15),
        ("Anahi", "Curtis", 12, 15),
        ("Jayda", "Stephens", 12, 15),
        ("Lea", "Barnett", 13, 16),
        ("Miah", "Ali", 13, 16),
        ("Kayley", "Melton", 13, 16),
        ("Sam", "Ross", 13, 16),
        ("Haylie", "Peters", 13, 16),
        ("Ana", "Brady", 13, 16),
        ("Israel", "Joyce", 13, 16),
        ("Angelique", "Banks", 13, 16),
        ("Rylee", "Hayes", 14, NULL),
        ("Kimora", "Oneili", 15, 33),
        ("Valentina", "Donovan", 16, 34),
        ("Emerson", "Clark", 16, 34),
        ("Sabrina", "Hampton", 16, 34),
        ("Giancarlo", "Norton", 16, 34),
        ("Tony", "Chung", 17, NULL),
        ("Toby", "Koch", 18, 39),
        ("Heath", "Stone", 19, 40),
        ("Lucian", "Avery", 19, 40),
        ("Laney", "Choi", 19, 40),
        ("Zack", "Taylor", 19, 40),
        ("Colin", "Massey", 19, 40),
        ("Jasmin", "Vance", 19, 40);