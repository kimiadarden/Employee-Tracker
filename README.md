# Employee Tracker

## Data base Tables

There are three tables, the "employeee table" is related to the "role tabel" via a foreign key, similarly the "role table" is connected to department table.

- **1) department**

- **2) role**

- **3) employee**

## Data base structure:

The main structure of the tables are in the schema and all the values that are assigned are in seed file.I seperated them to be able to modify the database easier.

- **I) schema**

- **II) seed**

## Start and End function:


- **Start:: Initialprompt Function:**
 In this function, the users have the choice of different tasks to choose from 

- **End: userChoiceSwitch Function:**
Depeneding on the users input , We move in to the appropiate case and excecute the specific function related to the choosen task.


## Displaying the Tables:

- **I)  Departemnt List**

Function: viewEntireDep

- **II)  roles List:**

Function: viewEntireRole
- **II)  employees List**

Function: viewAllEmployees


## User Input:

- **I) Adding Departemnt**

Function to get users Input: getDepName

Function to add users Input to the Database: addDep

- **II) Adding roles:**

Function to get users Input: getRoleInfo

Function to add users Input to the Database: addRole
- **II) Adding employees**

Function to get users Input: getEmpInfo

Function to add users Input to the Database:  addEmployee


##  Functions using query to grab specific Data:

- **)  Manager name Function:getManagerNames**
- **)  Department name Function:getNameOfDep**
- **)  List of roles Function: getRoles**
- **)  List of roles ID Function :getRoleId**
- **)  List of Department ID Function: getDepId**


