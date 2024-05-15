import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { NavDropdown } from './menu-components';

const adminMenuItems = () => (
  <>
    <MenuItem to="/admin/user-management">User management</MenuItem>
    <MenuItem to="/admin/metrics">Metrics</MenuItem>
    <MenuItem to="/admin/health">Health</MenuItem>
    <MenuItem to="/admin/configuration">Configuration</MenuItem>
    <MenuItem to="/admin/logs">Logs</MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
  </>
);

const openAPIItem = () => <MenuItem to="/admin/docs">API</MenuItem>;

export const AdminMenu = ({ showOpenAPI }) => (
  <NavDropdown name="Administration" id="admin-menu" data-cy="adminMenu">
    {adminMenuItems()}
    {showOpenAPI && openAPIItem()}
  </NavDropdown>
);

export default AdminMenu;
