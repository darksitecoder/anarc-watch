import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// All imports are relative to the `src` folder
import Header from './components/Header';
import CustomCursor from './components/CustomCursor';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';

export default function App() {
    // This 'page' state controls which page is visible, starting with 'Home'
    const [page, setPage] = useState('Home');
    
    // This 'selectedProduct' state holds the data for the product detail page
    const [selectedProduct, setSelectedProduct] = useState(null);

    // --- ADD THIS EFFECT TO FIX SCROLLING ---
    useEffect(() => {
        // This command scrolls the window to the top left corner (0, 0)
        window.scrollTo(0, 0);
    }, [page]); // The dependency array ensures this runs every time 'page' changes

    // This function decides which page component to render based on the current state
    const renderPage = () => {
        switch (page) {
            case 'Home': 
                return <HomePage setPage={setPage} />;
            case 'Products': 
                return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
            case 'ProductDetail': 
                // It only renders if a product has been selected
                if (selectedProduct) {
                    return <ProductDetailPage product={selectedProduct} setPage={setPage} />;
                }
                // Fallback to products page if no product is selected
                return <ProductsPage setPage={setPage} setSelectedProduct={setSelectedProduct} />;
            case 'About': 
                // CORRECTED: The setPage prop is now passed to AboutPage
                return <AboutPage setPage={setPage} />;
            case 'Login': 
                return <LoginPage />;
            default: 
                return <HomePage setPage={setPage} />;
        }
    };

    return (
        // The main container for the entire app
        <div className="min-h-screen bg-black font-sans cursor-none">
            {/* These components are always present on every page */}
            <CustomCursor />
            <Header page={page} setPage={setPage} />
            
            <main>
                {/* AnimatePresence handles the smooth transitions when the page state changes */}
                <AnimatePresence mode="wait">
                    <div key={page}>
                        {renderPage()}
                    </div>
                </AnimatePresence>
            </main>
        </div>
    );
}