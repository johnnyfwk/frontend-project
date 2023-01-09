import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import SingleReview from './components/SingleReview';
import Users from './components/Users';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
          <Route path="/users" element={<Users />}></Route>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
