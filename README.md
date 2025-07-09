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

## API Endpoints Integration

The frontend integrates with the following Spring Boot API endpoints:

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
- `GET /api/user/getAllBooks` - Get all books

### User APIs
- `POST /api/register/user` - User registration
- `POST /api/login/user` - User login
- `POST /api/user/borrow/{bookId}` - Borrow book
- `GET /api/user/getAllBooks` - Get all books

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Running Spring Boot backend (on port 8080)

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
   REACT_APP_API_URL=http://localhost:8080
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

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
│   └── api.js
├── App.js
├── index.js
└── index.css
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

Built with ❤️ using React and modern web technologies.