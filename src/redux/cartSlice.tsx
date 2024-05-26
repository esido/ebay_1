import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single product
interface Product {
  id: string;
  name: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  // Add other properties if needed
}

// Define the type for the state of the cart
interface CartState {
  cart: Product[];
}

// Initial state
const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem("addedProducts") ?? "[]") as Product[],
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.cart.push(action.payload);
        localStorage.setItem("addedProducts", JSON.stringify(state.cart));
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload
      );
      localStorage.setItem("addedProducts", JSON.stringify(state.cart));
    },
  },
});

// Export actions and the slice
export const { addProduct, removeCart } = cartSlice.actions;
export { cartSlice };
