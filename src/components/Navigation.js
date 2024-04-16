import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, Link } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  // const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <Navbar className='navbar'>
      <NavbarContent className='nav-content'>
        <NavbarBrand>
          <Link onClick={() => navigate('/')} className='nav-brand'>
            POSTGRAM
          </Link>
        </NavbarBrand>

        <Link onClick={() => navigate('add-post')} className={'nav-item'}>
          Add Post
        </Link>

        <Link onClick={() => navigate('view-post')} className={'nav-item'}>
          Your Feed
        </Link>

        <Link onClick={() => navigate('/sign-in')} className={'nav-item'}>
          Logout
        </Link>

        <Link onClick={() => navigate('/profile')} className={'nav-item'}>
          Profile
        </Link>
      </NavbarContent>
    </Navbar>
  );
}
// // src/auth/AuthContext.js
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = (userCredentials) => {
//     // Placeholder for login logic
//     setUser({ id: '1', username: 'user' }); // Simulate a user login
//   };

//   const logout = () => {
//     setUser(null); // Log out the user
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     // Redirect them to the login page, but save the current location they were trying to go to
//     return <Navigate to="/sign-in" state={{ from: location }} replace />;
//   }

//   return children;
// };
// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Home } from './pages/Home';
// import AddPost from './components/AddPost'; // Assuming you have this component
// import Profile from './components/Profile'; // Assuming you have this component
// import SignIn from './components/SignIn'; // Assuming you have this component
// import { AuthProvider } from './auth/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />}>
//             <Route path="add-post" element={
//               <ProtectedRoute>
//                 <AddPost />
//               </ProtectedRoute>
//             } />
//             <Route path="profile" element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             } />
//             {/* Add more protected routes as needed */}
//           </Route>
//           <Route path="/sign-in" element={<SignIn />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;
// src/components/Navigation.js
// import { useAuth } from '../auth/AuthContext';
// ...
// export default function Navigation() {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   return (
//     ...
//         <Link onClick={() => {
//           logout();
//           navigate('/sign-in');
//         }} className={'nav-item'}>
//           Logout
//         </Link>
//     ...
//   );
// }
