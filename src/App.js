import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Header from './components/Header';
import Nav from './components/Nav';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import Error404 from './components/Error404';
import SingleReview from './components/SingleReview';
import Categories from './components/Categories';
import SingleCategory from './components/SingleCategory';

function App() {
  const [usernameLoggedIn, setUsernameLoggedIn] = useState( "tickle122" );
  const [reviews, setReviews] = useState( [] );
  const [ categories, setCategories ] = useState( [] );

  return (
    <div className="App">
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/reviews"
            element={<Reviews reviews={reviews} setReviews={setReviews} />}>
          </Route>
          <Route path="/reviews/:review_id" element={<SingleReview usernameLoggedIn={usernameLoggedIn}/>}></Route>
          <Route path="/categories" element={<Categories />}/>
          <Route path="/categories/:category" element={<SingleCategory setCategories={setCategories}/>} />
          <Route path="/*" element={<Error404 />}></Route>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
