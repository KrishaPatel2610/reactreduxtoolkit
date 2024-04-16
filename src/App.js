// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import CreatePostModal from './components/CreatePostModal';
import ViewPost from './components/ViewPost';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/' element={<Home />}>
            <Route path='add-post' element={<CreatePostModal />} />
            <Route path='view-post' element={<ViewPost />} />
            <Route path='/profile' element={<UserProfile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
