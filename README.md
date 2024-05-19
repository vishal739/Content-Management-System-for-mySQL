
# Content Management System using MySQL

This project is a very basic headless CMS with CRUD functionality. It allows you to create different entities from the frontend by specifying their attributes and types. The app automatically creates a table definition based on the attributes in a MySQL database. After creating an entity, you can Create, Read, Update, and Delete data in that entity from the frontend.

## Features

- **Create Entities**: Define new entities with attributes and their types.
- **CRUD Operations**: Create, Read, Update, and Delete data entries for each entity.
- **Auto Table Creation**: Automatically creates MySQL tables based on the entity definitions.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## Prerequisites

- Node.js and npm installed
- MySQL installed and running

## Setup

### Backend

1. **Clone the repository**:
   ```sh
   git clone https://github.com/vishal739/Content-Management-System-for-mySQL.git
   cd frontend -> for frontend
   cd backend -> backend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up MySQL database**:
   - Create a database named `cms`.
   - Update the database configuration in `server/config/db.js` with your MySQL credentials.

4. **Run the server**:
   ```sh
   npm run dev
   ```

### Frontend

1. **Navigate to the frontend directory**:
   ```sh
   cd frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the frontend**:
   ```sh
   npm run dev
   ```

   The frontend should now be running on `http://localhost:3000`.

### BackEnd

1. **Navigate to the frontend directory**:
   ```sh
   cd backend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the frontend**:
   ```sh
   npm run dev
   ```

   The backend should now be running on `http://localhost:8000`.

## Usage

### Creating an Entity

1. Go to the frontend application.
2. Navigate to the "Create Entity" section.
3. Define a new entity by specifying its name and attributes (e.g., Person with attributes name<string>, email<string>, mobileNumber<number>, dateOfBirth<Date>).
4. Submit the form to create the entity. This will create a corresponding table in the MySQL database.

### CRUD Operations

1. **Create**: Add new entries to the entity by filling out the form in the "Add Entry" section.
2. **Read**: View existing entries in the "View Entries" section.
3. **Update**: Modify existing entries by selecting the entry and updating the fields.
4. **Delete**: Remove entries by selecting the entry and clicking the delete button.

## Project Structure

- **frontend/**: React frontend application
- **backend/**: Node.js and Express backend application
  - **config/**: Database configuration
  - **controllers/**: Route handlers
  - **routes/**: API routes
  - **index.js**: Server entry point

## API Endpoints

### Entity Management

- **POST /api/entity**: Create a new entity
- **GET /api/entity**: Get all entities
- **PUT /api/entity**: Update a specific entity
- **DELETE /api/entity**: Delete a specific entity

### Attribute Management

- **POST /api/entity/attribute**: Add a new attribute to an entity
- **GET /api/entity/attribute/:name**: Get all attributes of a specific entity
- **PUT /api/entity/attribute**: Update an attribute's name
- **DELETE /api/entity/attribute**: Delete an attribute

### Table Data Management

- **GET /api/entity/attribute/data/:name**: Get table data for a specific attribute of an entity
- **POST /api/entity/attribute/data**: Insert data into a table for a specific attribute of an entity
- **PUT /api/entity/attribute/data**: Update data in a table for a specific attribute of an entity
- **DELETE /api/entity/attribute/data**: Delete data from a table for a specific attribute of an entity


 

## License

This project is licensed under the MIT License.

---

Feel free to customize this README file to better suit your project's needs.
