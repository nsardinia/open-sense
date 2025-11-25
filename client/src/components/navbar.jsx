import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './navbar.css'

const HamburgerNav = () => {
const [menuOpen, setMenuOpen] = useState(false);

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' }, // <-- link for the dashboard
    { name: 'About', path: '/about' },
    { name: 'Documentation', path: '/docs' },
    { name: 'Community', path: '/community' },
    { name: 'Contribute', path: '/contribute' },
    { name: 'Events', path: '/event' }
];

return (
    <>
    <nav className="hamburger-nav">
        <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger-button"
        >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link, index) => (
            <Link key={index} to={link.path} onClick={() => setMenuOpen(false)}> 
            {link.name}
            </Link>
        ))}
        </div>
    </nav>
    </>
);
};

export default HamburgerNav;