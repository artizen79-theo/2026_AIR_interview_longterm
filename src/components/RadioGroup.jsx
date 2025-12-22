import React from 'react';
import { motion } from 'framer-motion';
import './RadioGroup.css';

const RadioGroup = ({ label, subLabel, name, options, value, onChange }) => {
    return (
        <div className="radio-group-wrapper">
            <div className="radio-group-label">
                <span className="label-main">{label}</span>
                {subLabel && <span className="label-sub">{subLabel}</span>}
            </div>
            <div className="radio-options">
                {options.map((option) => (
                    <label key={option.value} className={`radio-option ${value === option.value ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={(e) => onChange(e.target.value)}
                            className="radio-input"
                        />
                        <span className="radio-text">{option.label}</span>
                        {value === option.value && (
                            <motion.div
                                layoutId={`highlight-${name}`}
                                className="radio-highlight"
                                initial={false}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                        )}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioGroup;
