import NavBar from "./Components/NavBar.js";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './Redux/store';

import Login from './Pages/LogIn/logInPage.js';
import Register from './Pages/Registration/registerPage.js'

import Landing from './Pages/Landing/Landing.js';
import Gallery from './Pages/Gallery/Gallery.js';
import Explore from './Pages/Explore/Explore.js';
import Services from './Pages/Services/Services.js';
import Profile from './Pages/Profile/Profile.js';
import NotFound from './Components/NotFound.js';

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar></NavBar>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/services" element={<Services />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
