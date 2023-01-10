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

function App() {
  const [ reviews, updateReviews ] = useState( [] );
  const [ categories, updateCategories ] = useState( [] );

  return (
    <div className="App">
        <Header />
        <Nav />
        <Routes>

          <Route path="/" element={<Home />}></Route>

          <Route
            path="/reviews"
            element={<Reviews
              reviews={reviews}
              updateReviews={updateReviews}
              categories={categories}
              updateCategories={updateCategories} />}>
          </Route>

          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>

          <Route path="/*" element={<Error404 />}></Route>

        </Routes>
        <Footer />
    </div>
  );
}

export default App;
