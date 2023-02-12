import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useState } from "react";

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <CartProvider>
      {cartIsOpen && <Cart closeCart={() => setCartIsOpen(false)} />}
      <Header openCart={() => setCartIsOpen(true)} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
