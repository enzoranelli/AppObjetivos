import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize state from localStorage to prevent flash
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    // Initialize theme on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const htmlElement = document.documentElement;
        
        // Remove any existing dark class first
        htmlElement.classList.remove('dark');
        
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            htmlElement.classList.add('dark');
            console.log('Loaded saved dark theme');
        } else {
            setIsDarkMode(false);
            localStorage.setItem('theme', 'light');
            console.log('Loaded light theme (default or saved)');
        }
    }, []);

    // Apply theme changes when toggling
    useEffect(() => {
        const htmlElement = document.documentElement;
        
        htmlElement.classList.remove('dark');
        
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log('Applied dark theme');
        } else {
            localStorage.setItem('theme', 'light');
            console.log('Applied light theme');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        console.log('Toggling theme from:', isDarkMode ? 'dark' : 'light', 'to:', !isDarkMode ? 'dark' : 'light');
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
