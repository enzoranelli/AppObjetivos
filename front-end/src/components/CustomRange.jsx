import React from 'react';

function CustomRange({ min = 0, max = 100, value, onChange, name }) {
    const handleRangeChange = (e) => {
        const newValue = e.target.value;
        // Create a synthetic event object to match the expected format
        const syntheticEvent = {
            target: {
                name: name,
                value: newValue
            }
        };
        onChange(syntheticEvent);
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="w-full">
            <div className="relative mb-2">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                    style={{
                        background: `linear-gradient(to right, #fbb003 0%, #fbb003 ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`
                    }}
                />
                <style jsx>{`
                    .slider::-webkit-slider-thumb {
                        appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: #ff8000;
                        cursor: pointer;
                        border: 2px solid #fff;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }
                    
                    .slider::-moz-range-thumb {
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: #ff8000;
                        cursor: pointer;
                        border: 2px solid #fff;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    }
                `}</style>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{min}%</span>
                <span>{max}%</span>
            </div>
        </div>
    );
}

export default CustomRange;
