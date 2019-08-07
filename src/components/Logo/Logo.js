import React from 'react';

import burgerLogo from '../../assets/logo/burger-logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="logo" style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;