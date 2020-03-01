const inquirer = require("inquirer");
let Database = require("./db-index");
let cTable = require("console.table");

const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_DB"
});


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
                    "Exit"
                ]
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


async function main() {
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


            case 'Exit': {
                exitLoop = true;
                process.exit(0); 
                return;
            }

        }
    }
}

process.on("exit", async function (code) {
    await db.close();
    return 
});

main();

