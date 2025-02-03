# 🚀 React.js Dashboard Application 

## Overview 🌟
This project is a React.js-based dashboard application featuring authentication, product management (CRUD operations), API integration, state management, and a responsive UI. The application ensures authorization handling and provides a seamless user experience with search, pagination, and sorting functionalities.

## Features 🔥
- 🔐 **Login System**: Secure authentication with JWT token handling.
- 📊 **Dashboard Page**: Protected dashboard with a sidebar and dark mode toggle.
- 🛒 **CRUD Operations for Products**: Add, edit, delete, and view products.
- 🌍 **Global API Interceptor**: Manages JWT tokens using Axios interceptors.
- 🔎 **Search, Pagination, and Sorting**: Enhances product management and accessibility.
- 📱 **Responsive UI**: Works across multiple device sizes.

## Installation ⚙️

### Prerequisites 
Ensure you have the following installed:
-  [Node.js](https://nodejs.org/)
-  npm or yarn

### Setup 🚀
1. 📂 Clone the repository:
   ```sh
   git clone https://github.com/vish-ahire/storemaster.git
   ```
2. 📁 Navigate to the project directory:
   ```sh
   cd storemaster
   ```
3. 🔧 Install dependencies:
   ```sh
   npm install
   ```
4. 📝 Create a `.env` file in the root directory and add the following environment variables:
   ```sh
   REACT_APP_API_URL=https://productdata-2h2l.onrender.com
   REACT_APP_LOGIN_URL=https://dev.api.theforgeapp.io/api/v1/admin/auth/login
   ```
5. ▶️ Start the development server:
   ```sh
   npm start
   ```
   The application will run on `http://localhost:3000/`.

## API Integration 🌐
- 🔑 **Authentication API**: Provided by the backend.
- 🛍️ **Product API**: `https://productdata-2h2l.onrender.com`

## Usage 🎮

### Authentication 🔑
- 🔓 Users must log in using their email and password.
- 🔄 JWT tokens are stored and managed via Axios interceptors.

### Product Management 🛒
- ➕ **Create**: Add a new product using the form.
- 👀 **Read**: View products in a table format.
- ✏️ **Update**: Edit product details.
- ❌ **Delete**: Remove products with a confirmation prompt.

### Other Features ✨
- 🔍 Search products by name, category, or description.
- 📊 Pagination and sorting for better product management.
- 🌙 Dark mode toggle for UI customization.

## Technologies Used 💻
- 🎨 **Frontend**: React.js, React Router,Redux for state management, React Query
- ⚡ **HTTP Client**: Axios
- 🗄️ **Backend (Mock Server)**: JSON Server
- 🎨 **Styling**: CSS, TailwindCSS

## Project Structure 📂
```
react-dashboard/
|-- src/
|   |-- components/
|   |-- services/
|   |-- app/
|-- public/
|-- .env
|-- package.json
|-- README.md
```

## Contributing 🤝
Feel free to fork this repository and submit pull requests.

## License 📜
This project is licensed under the MIT License.

## Contact 📧
For queries, contact [Pranav Ahire](mailto:pranavahire11234@gmail.com).

