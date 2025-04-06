# User Management API

This is a Node.js-based RESTful API for managing users, built with Express and TypeORM. It supports CRUD operations for user management and connects to a MySQL database.

## Features

- Create, read, update, and delete users.
- Input validation for user data.
- Environment-based configuration using `.env` files.
- Database integration with MySQL using TypeORM.
- Middleware for CORS and JSON request validation.  

PROJECT OVERVIEW This API provides basic user management functionality with the following features:

Create new user records
Retrieve user data (single or multiple users)
Update existing user information
Delete users
SETUP INSTRUCTIONS Prerequisites -Node JS -XAMPP

# Installation

Clone the repository url
In the terminal, enter "npm install"
Create a database in the mysql using XAMPP -Open XAMPP -Start APACHE and MYSQL -Click Admin on the MYSQL -Create database named "user_management_db"\
Update the credentials in the data-source.ts file
Start the express server by typing "npm run dev"
API DOCUMENTATION base URL = http://localhost:3000 GET /users = GET ALL GET /users/:id = GET ONE BY ID POST /users = CREATE ONE DELETE /users/:id = DELETE ONE BY ID

# TESTING

Open Thunder Client or PostMan
Create new http request
FOR GET ALL USERS API

Input "http://localhost:3000/users" in the bar
ENSURE the request type is GET
Send Request
FOR GET ONE BY ID API

Input "http://localhost:3000/users/{id}" in the bar
Change the {id} to the preferred ID
ENSURE the request type is GET
Send Request
FOR CREATE ONE

Input "http://localhost:3000/users" in the bar
In the body tab, pick JSON format, this might differ depending on the HTTP Request App
Add an object with name,email,password (e.g {"name" : "name", "email" : "name@gmail.com", "password" : "securepassword"})
ENSURE the request type is POST
Send Request
FOR DELETE ONE

Input "http://localhost:3000/users/{id}" in the bar
Change the {id} to the preferred ID
ENSURE the request type is DELETE
Send Request
