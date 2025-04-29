import { useState } from 'react';
import home from './components/Home';
import user_profile from './components/User_Profile/user_profile';
import restaurant_profile from './components/Restaurant_Profile/restaurant_profile';

export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/Home' element={<home />} />
          <Route path='/User_Profile' element={<user_profile />} />
          <Route path='/Restaurant_Profile' element={<restaurant_profile />} />
        </Routes>
      </Router> 
    </div>
  );
};