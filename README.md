# Cookbook
## Recipe Management System

This is a Node.js project that utilizes the Express library for managing recipes.

### Features

- User registration and login functionality.
- Ability for users to create, edit, view, and delete recipes.
- Recipes are associated with the user who created them and can only be accessed by the respective user.
- Data validation for each route, ensuring that the provided values are as expected.
- A recipe consists of a name, description, and preparation time.
- User information includes a name, email, and password (note that email addresses must be unique among all users).

### Installation

1. Clone the repository:
2. Navigate to the project directory: 
3. Install the dependencies: 
4. Set up the database:
- Create a new database. (I used sqlite)
- Update the database connection details in the `.env` file.
5. Start the application:
6. Access the application in your browser at `http://localhost:3000`.

## Usage

- Register a new user by providing a name, email, and password.
- Log in with your credentials.
- Create, edit, view, and delete recipes associated with your account.
- Ensure that all data provided follows the expected format; otherwise, an error will be displayed.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).




