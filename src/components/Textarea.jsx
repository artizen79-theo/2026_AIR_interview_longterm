import React from 'react';
import { motion } from 'framer-motion';
import './Textarea.css';

const Textarea = ({ label, subLabel, id, ...props }) => {
    return (
        <div className="textarea-wrapper">
            <label htmlFor={id} className="textarea-label">
                <span className="label-main">{label}</span>
                {subLabel && <span className="label-sub">{subLabel}</span>}
            </label>
            <motion.textarea
                whileFocus={{ borderColor: 'var(--color-primary)' }}
                id={id}
                className="textarea-field"
                rows={4}
                {...props}
            />
        </div>
    );
};

export default Textarea;
