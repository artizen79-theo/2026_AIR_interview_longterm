import React from 'react';
import { motion } from 'framer-motion';
import './Input.css';

const Input = ({ label, subLabel, id, type = 'text', ...props }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor={id} className="input-label">
                <span className="label-main">{label}</span>
                {subLabel && <span className="label-sub">{subLabel}</span>}
            </label>
            <motion.input
                whileFocus={{ scale: 1.01, borderColor: 'var(--color-primary)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                type={type}
                id={id}
                className="input-field"
                {...props}
            />
        </div>
    );
};

export default Input;
