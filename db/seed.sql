USE employee_DB;

INSERT into department (name) VALUES ('Engineering');
INSERT into department (name) VALUES ('HR');
INSERT into department (name) VALUES ('IT');


INSERT INTO
    role (title, salary, department_id)
VALUES
    ('Lead Engineer',150000,1),
    ('senior Engineer',110000,1),
    ('Manager Engineer',130000,1),
    ('Lead HR', 80000,2),
    ('Senior HR',60000,2),
    ('Lead IT',90000,3),
    ('senior IT',80000,3);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES

    ('Kimia','Darden',1,NULL),
    ('Tara','elli',2,NULL),
    ('John','Smith',3,NULL),
    ('Sara','Parker',4,NULL),
    ('Gia','Thomas',5,NULL),
    ('Mona','vand',6,NULL) ,
    ('daniel','beeZ',7,NULL);