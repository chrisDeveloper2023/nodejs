CREATE DATABASE typescriptdatabase;

CREATE table users(
    id serial primary key,
    name varchar(40),
    email text
);

INSERT INTO users (NAME, EMAIL) 
    VALUES('JOE', 'joe@ibm.com'),
    ('RYAN', 'ryan@propanal.com');