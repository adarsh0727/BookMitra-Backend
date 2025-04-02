# BookMitra Backend

A robust Node.js backend service for managing book transactions, user authentication, and categorization.

## Project Structure

```
BOOKMITRA-BACKEND/
├── controllers/         # Request handlers for different resources
│   ├── auth.controller.js
│   ├── books.controller.js
│   ├── category.controller.js
│   ├── transactions.controller.js
│   └── users.controller.js
├── db/
│   └── connect.js       # Database connection configuration
├── middlewares/
│   └── auth.middleware.js  # Authentication middleware
├── models/              # Data models representing database schema
│   ├── Book.js
│   ├── BookCategory.js
│   ├── BookTransaction.js
│   └── User.js
├── node_modules/        # Dependencies
├── routes/              # API routes definition
│   ├── auth.routes.js
│   ├── books.routes.js
│   ├── categories.routes.js
│   ├── transaction.routes.js
│   └── user.routes.js
├── utils/               # Utility functions
│   └── jwt.utils.js     # JWT token handling utilities
├── .env                 # Environment variables (not in version control)
├── .env.example         # Example environment variables template
├── .gitignore           # Git ignore configuration
├── package-lock.json    # Dependency lock file
├── package.json         # Project metadata and dependencies
└── server.js           # Main application entry point
```

## Backend Flow
![Image](https://github.com/user-attachments/assets/bfa2d412-2596-4ab4-b38a-fd49c89e4b72)

## Features

- **User Authentication**: Secure JWT-based authentication system
- **Book Management**: CRUD operations for books
- **Category Management**: Organize books by categories
- **Transaction Handling**: Track book borrowing and returning
- **Role-based Access**: Different permissions for users and administrators

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/bookmitra-backend.git
   cd bookmitra-backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your specific configuration

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get authentication token

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Books
- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create a new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Create a new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

## Environment Variables

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/bookmitra

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
```

## Technologies Used

- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token for authentication
- **bcrypt**: Password hashing

## Development

Run in development mode with hot reload:
```
npm run dev
```

## Testing

Run tests:
```
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
