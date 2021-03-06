const inquirer = require("inquirer");
let Database = require("./db-index");
let cTable = require("console.table");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Workhard20!",
    database: "employee_DB"
});

//User initial prompt choice:
async function initialPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "userInit",
                choices: [

                    "View all departments",
                    "View all employees",
                    "View all roles",
                    "Add new Department",
                    "Add new Employee",
                    "Add role",
                    "Exit"
                ]
            }
        ])
}

//depending on the user choice, we move to the appropiate case:
async function userChoiceSwitch() {
    let exitLoop = false;
    while (!exitLoop) {
        const prompt = await initialPrompt();

        switch (prompt.userInit) {

            case 'View all departments': {
                await viewEntireDep();
                break;
            }
            case 'View all employees': {
                await viewAllEmployees();
                break;
            }
            case 'View all roles': {
                await viewEntireRole();
                break;
            }
            case 'Add new Department': {
                const newDepName = await getDepName();
                await addDep(newDepName);
                break;
            }
            case 'Add new Employee': {
                const newEmployee = await getEmpInfo();
                await addEmployee(newEmployee);
                break;
            }
                case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }
            case 'Exit': {
                exitLoop = true;
                process.exit(0);
                return;
            }

        }
    }
}


//user input for the new role :
async function getRoleInfo() {
    const departments = await getNameOfDep();
    return inquirer
    .prompt([
        {
        type: "input",
        message: "What is the title of the role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary"
    },
    {
        type: "list",
        message: "Which department do you want to add this role??",
        name: "departmentName",
        choices: [
            ...departments
        ]
    }
])
}

//user input to add new employee
async function getEmpInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
    .prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    ...managers
                ]
            }
        ])
    }

    async function getDepName() {
        return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the new department that you want to add?",
                name: "departmentName"
            }
        ])
    }
    
//showing the department list
async function viewEntireDep() {

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}

//showing the employee list
async function viewAllEmployees() {

    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

//showing the role list 
async function viewEntireRole() {
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await empID(employeeInfo.manager);

    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    // let args = [employeeInfo.first_name, employeeInfo.last_name, roleId];
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];

    const rows = await db.query(query, args);
}

async function addRole(roleInfo) {
    const departmentId = await getDepId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log("Added the new role");
}

async function addDep(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log("The new  department was added ");
}



async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    let employeeNames = [];
    for(const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function getNameOfDep() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);

    let departments = [];
    for(const row of rows) {
        departments.push(row.name);
    }
    return departments;
}



async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);

    let roles = [];
    for(const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getDepId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function empID(fullName) {
    let employee = getFirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args=[employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
}

function getFirstAndLastName( fullName ) {
    let employee = fullName.split(" ");
    if(employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length-1];
    let first_name = " ";
    for(let i=0; i<employee.length-1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
}

process.on("exit", async function (code) {
    await db.close();
    return
});

userChoiceSwitch();

