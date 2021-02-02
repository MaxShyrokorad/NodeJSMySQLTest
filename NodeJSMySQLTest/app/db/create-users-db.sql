DROP DATABASE IF EXISTS my_db;
CREATE DATABASE IF NOT EXISTS my_db;

USE my_db;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY auto_increment,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    phone VARCHAR(20) NULL
);

CREATE TABLE IF NOT EXISTS products(
    id INT PRIMARY KEY auto_increment,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    image VARCHAR(255),
    user_id INT ,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

