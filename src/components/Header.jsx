import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
    return (
        <header className="app-header">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="header-content"
            >
                <div className="logo-area">
                    {/* Placeholder for Logo if any, or just stylized text */}
                    <div className="logo-placeholder">KOGANECHO AIR 2026</div>
                </div>
                <h1 className="main-title">
                    黄金町アーティスト・イン・レジデンス 2026 アンケート
                </h1>
                <h2 className="sub-title">
                    Questionnaire for Koganecho Artist in Residence 2026
                </h2>
                <p className="header-desc">
                    今後のプログラム向上のため、アンケートにご協力をお願いいたします。
                    <br />
                    Please fill out this questionnaire to help us improve the program.
                </p>
            </motion.div>
        </header>
    );
};

export default Header;
