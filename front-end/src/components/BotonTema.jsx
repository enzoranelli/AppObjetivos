import React from 'react';
import { useTheme } from '../context/ThemeProvider';
import SunIcon from '../assets/images/sun.svg?react';
import MoonIcon from '../assets/images/moon.svg?react';

function BotonTema(){
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="flex items-center gap-2">
            <SunIcon
                className={`w-6 h-6 transition-opacity duration-300 ${
                    !isDarkMode ? 'opacity-100 text-yellow-400' : 'opacity-30 text-white'
                }`}
                />
            <button
                onClick={toggleTheme}
                aria-label="Cambiar tema"
                className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative p-1 transition-colors duration-300"
            >
                <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    !isDarkMode ? 'translate-x-0' : 'translate-x-6'
                }`}
                />
            </button>
            <MoonIcon
                className={`w-6 h-6 transition-opacity duration-300 ${isDarkMode ? 'opacity-100 text-blue-300' : 'opacity-30 text-gray-400'}`}
            />
        </div>
    );
}

export default BotonTema;