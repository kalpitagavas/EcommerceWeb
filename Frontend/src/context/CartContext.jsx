import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add to cart logic
    const addToCart = (product) => {
        setCartItems((prev) => {
            const isExist = prev.find((item) => item.product === product._id);
            if (isExist) {
                return prev.map((item) =>
                    item.product === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { product: product._id, name: product.name, price: product.price, quantity: 1 }];
        });
    };

const deleteFromCart = (product) => {
    setCartItems((prev) => {
        const isExist = prev.find((item) => item.product === product._id);

        if (isExist.quantity > 1) {
            // Subtract 1 if multiple items exist
            return prev.map((item) =>
                item.product === product._id ? { ...item, quantity: item.quantity - 1 } : item
            );
        } else {
            // Remove the item completely if quantity is 1
            return prev.filter((item) => item.product !== product._id);
        }
    });
};
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, clearCart,deleteFromCart }}>
            {children}
        </CartContext.Provider>
    );
};