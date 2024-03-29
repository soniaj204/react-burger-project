import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = ( props ) => {
    let attachedClasses = ["sideDrawer", "close"];
    if (props.open) {
        attachedClasses = ["sideDrawer", "open"];
    }
    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={attachedClasses.join(' ')}>
                <div className="logo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;