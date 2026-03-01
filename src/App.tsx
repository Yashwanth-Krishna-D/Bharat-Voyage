import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Plan from './pages/Plan';
import ProfileSetup from './pages/ProfileSetup';
import Account from './pages/Account';

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
