DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departement (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);



CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL NOT NULL, 
  department_id INT NOT NULL, 
  FOREIGN KEY (department_id) REFERENCES departement(id)
);


CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL, 
  last_name VARCHAR(30) NOT NULL, 
  role_id INT NOT NULL, 
  manager_id INT NOT NULL, 
  FOREIGN KEY (role_id) REFERENCES role(id)
);