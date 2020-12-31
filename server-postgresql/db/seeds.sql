DROP TABLE IF EXISTS recipes;

CREATE TABLE recipes (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    author varchar(255),
    serves int NOT NULL,
);

INSERT INTO recipes (name, author, serves)
VALUES
    ('Mac n cheese', 'Kai', 4),
    ('Spaghetti bolognese', 'Kayi', 4),
    ('Burrito', 'Kayi', 2);
    