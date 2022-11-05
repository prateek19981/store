import "./App.css";
import ProductList from "./components/ProductList";
import React, { useReducer, useEffect } from "react";
import ProductReducer from "./Reducers/ProductReducer";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from "./components/Cart";
function App() {
  let currUrl = window.location.href;
  console.log("ccc", currUrl);
  const initialState = {
    products: [],
    loading: true,
    cart: [],
    showCartbtn: true,
  };
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      dispatch({
        type: "ADD_PRODUCTS",
        payload: res,
      });
    });
  }, []);
  return (
    <Router>
      <div className="App">
        <div className="header">
          <Link to="/">
            <img
              className="logo"
              src="https://cdn.thebrandingjournal.com/wp-content/uploads/2019/05/chanel_logo_the_branding_journal.jpg"
            />
          </Link>

          {state.showCartbtn && (
            <Link to="/cart">
              <span>Go to Cart</span>
            </Link>
          )}
        </div>
        <Routes>
          <Route
            exact
            path="/"
            element={<ProductList state={state} dispatch={dispatch} />}
          ></Route>
          <Route
            exact
            path="/cart"
            element={<Cart state={state} dispatch={dispatch} />}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
