# Brooi assessment

## Assessment Description
- Created a Properties database to keep track of a real estate's assets.
- These assets include Houses, Apartments, and specific Units within those apartments.
- The database also keeps track of all the assets of the company within the various states in Nigeria
- A backend server to CREATE, READ, UPDATE, and DELETE their assets with appropriate endpoints
- Assessment includes error handling and input-validation

## Tools Used
- SQLite3 for the database
- Node.js and Express for the backend server
- Knex to execute requests to the database via requests made from the express endpoints

## Dependencies
- body-parser, version 1.20.2
- express, version4.19.2
- express-validator, version 7.1.0
- knex, version 3.1.0
- sqlite3, version 5.1.7

## Requirements
- Postman to test the endpoints

### How to run
- Clone repository
- Navigate into the repository 
- Run "npm install" to install dependencies
- Run "npm start" to run the project
- Open up the server.js file to see all endpoints and request body structure
- Copy the endpoint into Postman and run with the appropriate HTTP Method
