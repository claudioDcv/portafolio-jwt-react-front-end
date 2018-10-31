import React from 'react';
import { NavItem, NavLink } from 'reactstrap';

const TabTitle = ({ title, activeTab, onClick, n }) => (
    <NavItem>
        <NavLink
            className={[activeTab === n ? 'active' : '', 'text-primary'].join(' ')}
            onClick={() => { onClick(n); }}
        >{title}
        </NavLink>
    </NavItem>
);

export default TabTitle;