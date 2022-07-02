-- Make a databse called:
-- weekend-to-do-app

CREATE TABLE tasks (
    "id" serial PRIMARY KEY,
    "taskTitle" varchar(40) NOT NULL,
    "taskDescription" varchar(120),
    "taskCompleted" boolean 
);

INSERT INTO tasks ("taskTitle", "taskDescription", "taskCompleted") 
VALUES ('Store', 'Groceries, Products', false ), 
('Gym', 'RUN, WEIGHTS', false ); 
