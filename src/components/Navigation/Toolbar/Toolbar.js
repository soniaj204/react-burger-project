import React from 'react';

import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className="toolbar">
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="logo">
            <Logo />
        </div>
        <nav className="dsktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;