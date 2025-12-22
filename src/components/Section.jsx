import React from 'react';
import { motion } from 'framer-motion';
import './Section.css';

const Section = ({ title, subTitle, children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="section-card"
        >
            {(title || subTitle) && (
                <div className="section-header">
                    {title && <h2 className="section-title">{title}</h2>}
                    {subTitle && <p className="section-subtitle">{subTitle}</p>}
                </div>
            )}
            <div className="section-content">
                {children}
            </div>
        </motion.div>
    );
};

export default Section;
