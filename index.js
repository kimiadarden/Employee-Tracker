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
