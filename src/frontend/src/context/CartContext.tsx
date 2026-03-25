import type { Product } from "@/data/products";
import { createContext, useContext, useEffect, useReducer } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  count: number;
}

type CartAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "UPDATE_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

function computeTotals(items: CartItem[]): { total: number; count: number } {
  return {
    total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    count: items.reduce((s, i) => s + i.quantity, 0),
  };
}

function reducer(state: CartState, action: CartAction): CartState {
  let items: CartItem[];
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...state.items, { product: action.product, quantity: 1 }];
      break;
    }
    case "REMOVE":
      items = state.items.filter((i) => i.product.id !== action.id);
      break;
    case "UPDATE_QTY":
      items =
        action.qty <= 0
          ? state.items.filter((i) => i.product.id !== action.id)
          : state.items.map((i) =>
              i.product.id === action.id ? { ...i, quantity: action.qty } : i,
            );
      break;
    case "CLEAR":
      items = [];
      break;
    default:
      return state;
  }
  const { total, count } = computeTotals(items);
  return { items, total, count };
}

const STORAGE_KEY = "nexcartify_cart";

function loadFromStorage(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const items = JSON.parse(raw) as CartItem[];
      const { total, count } = computeTotals(items);
      return { items, total, count };
    }
  } catch {
    // ignore
  }
  return { items: [], total: 0, count: 0 };
}

interface CartContextType extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product) => dispatch({ type: "ADD", product });
  const removeFromCart = (id: string) => dispatch({ type: "REMOVE", id });
  const updateQty = (id: string, qty: number) =>
    dispatch({ type: "UPDATE_QTY", id, qty });
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
