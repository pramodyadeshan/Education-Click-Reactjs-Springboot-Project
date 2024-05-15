import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';

import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = () => (
  <>
    <MenuItem to="/account/settings" data-cy="settings">
      Settings
    </MenuItem>
    <MenuItem to="/account/password" data-cy="passwordItem">
      Password
    </MenuItem>
    <MenuItem to="/logout" data-cy="logout">
      Sign out
    </MenuItem>
  </>
);

const accountMenuItems = () => (
  <>
    <MenuItem id="login-item" to="/login" data-cy="login">
      Sign in
    </MenuItem>
    <MenuItem to="/account/register" data-cy="register">
      Register
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown name="Account" id="account-menu" data-cy="accountMenu">
    {isAuthenticated && accountMenuItemsAuthenticated()}
    {!isAuthenticated && accountMenuItems()}
  </NavDropdown>
);
export default AccountMenu;
