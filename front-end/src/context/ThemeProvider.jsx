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
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Force remove dark class initially to override system preference
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        console.log('Forced removal of dark class on mount');
    }, []);

    // Check for saved theme preference or default to light mode
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const isDark = savedTheme === 'dark';
            setIsDarkMode(isDark);
            console.log('Loaded saved theme:', savedTheme, 'isDark:', isDark);
        } else {
            // Default to light mode initially
            setIsDarkMode(false);
            localStorage.setItem('theme', 'light');
            console.log('No saved theme, defaulting to light mode');
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        console.log('Applying theme, isDarkMode:', isDarkMode);
        const htmlElement = document.documentElement;
        
        // Always remove the class first
        htmlElement.classList.remove('dark');
        
        if (isDarkMode) {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            console.log('Added dark class to html element');
        } else {
            localStorage.setItem('theme', 'light');
            console.log('Removed dark class from html element');
        }
        
        // Log current classes
        console.log('Current html classes:', htmlElement.className);
        console.log('Dark class present:', htmlElement.classList.contains('dark'));
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
