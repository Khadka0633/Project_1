
import { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import { bags } from "./data/bags";
import { testimonials } from "./data/testimonials";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar"
import WishlistSidebar from "./components/WishListSidebar";

//pages
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import BestsellersPage from "./pages/BestsellersPage";
import StoriesPage from "./pages/StoriesPage";
import AboutPage from "./pages/AboutPage";


export default function App(){
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

   const addToCart = (bag) => {
      setCart(prev => {
        const ex = prev.find(i => i.id === bag.id);
        if (ex) return prev.map(i => i.id === bag.id ? { ...i, qty: i.qty + 1 } : i);
        return [...prev, { ...bag, qty: 1 }];
      });
    };
  
    const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
    const updateQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
   const toggleWishlist = (bag) => {
    setWishlist(prev =>
      prev.find(i => i.id === bag.id)
        ? prev.filter(i => i.id !== bag.id)
        : [...prev, bag]
    );
  };

  const wishlistIds = wishlist.map(i => i.id)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);


  return (
    <>
    <Navbar 
    cartCount={cartCount} 
    onCartOpen={() => setCartOpen(true)} 
    onWishlistOpen={()=> setWishlistOpen(true)}/>

      <Routes>
        <Route path="/" element={
          <HomePage
            bags={bags}
            testimonials={testimonials}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlistIds={wishlistIds}
          />}
        />

        <Route path="/collection"   element={
          <CollectionPage 
           addToCart={addToCart}
           toggleWishlist={toggleWishlist}
           wishlistIds={wishlistIds}
          />}
           />

        <Route path="/new-arrivals" element={
          <NewArrivalsPage 
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
          />} 
          />

        <Route path="/bestsellers"  element={
          <BestsellersPage 
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistIds={wishlistIds}
          />} 
          />
        <Route path="/stories"      element={<StoriesPage />} />
        <Route path="/about"        element={<AboutPage />} />
      </Routes>

          <Footer/>

      {cartOpen && <CartSidebar cart={cart} 
            onClose={() => setCartOpen(false)} 
            onRemove={removeFromCart} onQty={updateQty} />}

                  {wishlistOpen && (
  <WishlistSidebar
    wishlistItems={wishlist}
    onClose={() => setWishlistOpen(false)}
    onRemove={(id) => setWishlist(prev => prev.filter(i => i.id !== id))}
    onAddToCart={(item) => { addToCart(item); setWishlistOpen(false); }}
  />
)}
    </>

  )
}