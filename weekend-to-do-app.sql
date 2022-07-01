-- Make a databse called:
-- weekend-to-do-app

CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "taskTitle" varchar(20) NOT NULL,
    "taskDescription" varchar(120)
);

INSERT INTO koalas (taskTitle, taskDescription) 
VALUES ('Store', 'Groceries, Products'), 
('Gym', 'RUN, WEIGHTS'); 
