# LibraryMS - React Frontend

A modern, responsive, and animated frontend for the Library Management System built with React, Tailwind CSS, and Framer Motion.

## Features

### 🎨 **Beautiful UI/UX**
- Modern glass-morphism design
- Smooth animations with Framer Motion
- Responsive design for all devices
- Beautiful gradient backgrounds
- Interactive hover effects

### 🔐 **Authentication & Authorization**
- Role-based authentication (Admin, Librarian, User)
- Protected routes with role-based access
- Secure token-based authentication
- Context-based state management

### 👤 **User Types & Dashboards**

#### **Admin Dashboard**
- Register new administrators
- Register librarians
- System settings and configuration
- Overview statistics

#### **Librarian Dashboard**
- Add and manage books
- View all registered users
- Monitor borrowing transactions
- Book inventory management

#### **User Dashboard**
- Browse available books
- Search books by title, author, or ISBN
- Borrow books with real-time availability
- Personal profile management

### 📚 **Book Management**
- Add books with details (name, author, ISBN, quantity)
- Real-time book availability status
- Search and filter functionality
- Beautiful book cards with animations

### 👥 **User Management**
- View all registered users
- User profile information
- Contact details display
- Member since information

### 📊 **Transaction Tracking**
- View all borrowing transactions
- Transaction status monitoring
- Real-time updates
- Transaction history

## Tech Stack

- **React 18** - Modern React with hooks
- **React Router Dom** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Toast notifications
- **Context API** - State management

## Backend Fixes Applied

### 🔧 **Fixed Backend Issues:**

1. **Added Missing Book Endpoints**
   - ✅ Added `GET /api/books` - Retrieve all books
   - ✅ Added `GET /api/books/{bookId}` - Get book by ID
   - ✅ Updated BookService interface and implementation

2. **Enhanced CORS Configuration**
   - ✅ Added global CORS configuration class
   - ✅ Added `@CrossOrigin` annotations to all controllers
   - ✅ Configured for React development ports (3000, 3001)

3. **Improved Error Handling**
   - ✅ Added try-catch blocks to all controller methods
   - ✅ Consistent error response formats
   - ✅ Proper HTTP status codes

4. **Updated Application Configuration**
   - ✅ Enhanced `application.properties` with development settings
   - ✅ Added detailed logging configuration
   - ✅ Configured error message details

5. **Fixed API Consistency**
   - ✅ Corrected repository method calls in BookService
   - ✅ Updated frontend API calls to use correct endpoints
   - ✅ Standardized response handling

## API Endpoints Integration

The frontend integrates with the following Spring Boot API endpoints (Backend running on **port 5070**):

### Admin APIs
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `POST /api/admin/librarian_registration` - Register librarian

### Librarian APIs
- `POST /api/librarian/librarian_login` - Librarian login
- `GET /api/librarian/users` - Get all users
- `GET /api/librarian/transactions` - Get all transactions

### Book APIs
- `POST /api/register/book` - Add new book (librarian only)
- `GET /api/books` - Get all books ✨ **NEW**
- `GET /api/books/{bookId}` - Get book by ID ✨ **NEW**

### User APIs
- `POST /api/register/user` - User registration
- `POST /api/login/user` - User login
- `POST /api/user/borrow/{bookId}` - Borrow book
- `GET /api/user/getAllBooks` - Get all books (user context)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Spring Boot backend (on **port 5070**) ⚠️ **Updated Port**
- MongoDB running on localhost:27017

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5070
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

6. **Ensure your Spring Boot backend is running on `http://localhost:5070`**

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Backend Setup (Fixed)

To run the backend with all fixes:

1. **Ensure MongoDB is running**
   ```bash
   mongod --dbpath /path/to/your/db
   ```

2. **Start the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The backend will start on **port 5070**

3. **Verify CORS is working**
   - Check browser network tab for successful OPTIONS requests
   - No CORS errors should appear in console

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginPage.js
│   │   └── RegisterPage.js
│   ├── common/
│   │   └── LoadingSpinner.js
│   ├── dashboards/
│   │   ├── AdminDashboard.js
│   │   ├── LibrarianDashboard.js
│   │   └── UserDashboard.js
│   └── LandingPage.js
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js (Updated with correct port)
├── App.js
├── index.js
└── index.css
```

## Backend Structure (Fixed)

```
src/main/java/org/dev/lap/
├── config/
│   └── CorsConfig.java (NEW - Global CORS configuration)
├── controllers/
│   ├── Admin/AdminController.java (Fixed CORS & error handling)
│   ├── Book/BookController.java (Added new endpoints)
│   ├── Borrower/UserController.java (Fixed CORS & error handling)
│   ├── Librarian/LibrarianController.java (Fixed CORS & error handling)
│   └── TransactionLog/TransactionLogController.java (Fixed CORS)
├── services/
│   └── Book/
│       ├── BookService.java (Added new methods)
│       └── BookServiceImpl.java (Implemented new methods)
└── resources/
    └── application.properties (Enhanced configuration)
```

## Usage Guide

### 1. **Landing Page**
- Navigate to the homepage
- Choose to login or register
- View features and information

### 2. **Registration**
- New users can register as borrowers
- Fill in personal information
- Automatic redirect to login

### 3. **Login**
- Select your role (Admin, Librarian, or User)
- Enter credentials
- Automatic redirect to appropriate dashboard

### 4. **Admin Functions**
- Register new administrators
- Register librarians
- System configuration

### 5. **Librarian Functions**
- Add books to the library
- Manage book inventory
- View user information
- Monitor transactions

### 6. **User Functions**
- Browse available books
- Search by title, author, or ISBN
- Borrow available books
- View personal profile

## Animations & Interactions

- **Page transitions** with fade and slide effects
- **Card hover animations** with lift and scale
- **Button interactions** with press animations
- **Loading spinners** with custom animations
- **Modal animations** with scale and fade
- **Background elements** with floating animations

## Responsive Design

- **Desktop** - Full sidebar layout
- **Tablet** - Collapsible sidebar
- **Mobile** - Hamburger menu with overlay

## Error Handling

- **API errors** displayed with toast notifications
- **Form validation** with real-time feedback
- **Network errors** with user-friendly messages
- **Authentication errors** with automatic logout
- **CORS issues** resolved with proper configuration

## Troubleshooting

### Common Issues:

1. **CORS Errors**
   - ✅ Fixed with global CORS configuration
   - Ensure backend is running on port 5070
   - Check browser console for specific errors

2. **API Connection Issues**
   - Verify backend is running on `http://localhost:5070`
   - Check network tab in browser developer tools
   - Ensure MongoDB is running

3. **Authentication Issues**
   - Clear browser local storage
   - Check JWT token expiration
   - Verify role-based access

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@libraryms.com or create an issue on GitHub.

---

**✨ Latest Updates:**
- Fixed all backend CORS issues
- Added missing book management endpoints
- Enhanced error handling across all controllers
- Updated API port configuration (5070)
- Improved application configuration

Built with ❤️ using React and modern web technologies.