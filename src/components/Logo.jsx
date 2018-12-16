import React from 'react';

import './Logo.css';
import logoSafe from '../common/logoSafe.png';

const Logo = () => (
    <div className="safe-logo">
        <img src={logoSafe} alt="LOGO" />
    </div>
);

export default Logo;