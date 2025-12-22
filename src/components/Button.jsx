import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ children, disabled, onClick, type = 'button' }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary"
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
};

export default Button;
