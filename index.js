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
                message: "What would you like to do today?",
                name: "action",
                choices: [
                  
                  "View all departments",
                  "View all employees",
                  "View all roles",
                  "Exit"
                ]
            }
        ])
}



async function viewEntireDep() {

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
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
        }
    }
}

process.on("exit", async function (code) {
    await db.close();
    return 
});

main();