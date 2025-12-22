import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './Counter.css';

const Counter = ({ label, subLabel, value, onChange }) => {
    const handleDecrement = () => {
        onChange(Math.max(0, (value || 0) - 1));
    };

    const handleIncrement = () => {
        onChange((value || 0) + 1);
    };

    return (
        <div className="counter-wrapper">
            <div className="counter-label-group">
                <span className="counter-label-main">{label}</span>
            </div>
            <div className="counter-controls">
                <button type="button" onClick={handleDecrement} className="counter-btn" disabled={value <= 0}>
                    <Minus size={16} />
                </button>
                <div className="counter-value-display">
                    <span className="counter-value">{value || 0}</span>
                    <span className="counter-unit">回 / times</span>
                </div>
                <button type="button" onClick={handleIncrement} className="counter-btn">
                    <Plus size={16} />
                </button>
            </div>
        </div>
    ); // subLabel might be used in parent mapping, simplified here
};

export default Counter;
