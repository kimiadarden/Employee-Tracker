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

    ('Kimia','Darden',1,1),
    ('Tara','elli',2,2),
    ('John','Smith',3,3),
    ('Sara','Parker',4,4),
    ('Gia','Thomas',5,5),
    ('Mona','vand',6,8) ,
    ('daniel','beeZ',7,7);