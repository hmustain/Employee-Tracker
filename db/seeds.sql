-- DATA FOR DEPARTMENTS
INSERT INTO departments (name)
VALUES ("Sales"),
        ("Safety"),
        ("Operations"),
        ("Payroll"),
        ("Shop");

-- DATA FOR roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Director of Sales", 200000, 1),
        ("Sales Manager", 150000, 1),
        ("Sales Representative", 100000, 1),
        ("Director of Safety", 100000, 2),
        ("Safety Manager", 75000, 2),
        ("Safety Representative", 50000, 2),
        ("Director of Operations", 200000, 3),
        ("Customer Service Manager" 125000, 3),
        ("Fleet Operations Manager", 125000, 3),
        ("Customer Service Lead", 90000, 3),
        ("Fleet Operations Lead", 90000, 3),
        ("Customer Service Representative", 65000, 3),
        ("Driver Manager", 55000, 3),
        ("Director of Payroll", 95000, 4),
        ("Payroll Manager", 70000, 4),
        ("Payroll Representative", 45000, 4),
        ("Director of Mainenance" 100000, 5),
        ("Shop Manager", 75000, 5),
        ("Mechanic", 55000, 5);